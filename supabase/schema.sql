-- Enum for roles
CREATE TYPE user_role AS ENUM ('global_admin', 'contact');

-- Table: sponsor_categories
CREATE TABLE sponsor_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    max_job_offers INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: sponsors
CREATE TABLE sponsors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    edition VARCHAR(50) NOT NULL,
    category_id INT REFERENCES sponsor_categories(id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    logo_url text,
    description TEXT,
    twitter VARCHAR(255),
    linkedin VARCHAR(255),
    bluesky VARCHAR(255),
    instagram VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(edition, name)
);

-- Table: user_roles (Global Admins and potentially others)
CREATE TABLE user_roles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'contact',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: sponsor_users (Maps Contact users to Sponsors)
CREATE TABLE sponsor_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(sponsor_id, user_id)
);

-- Table: job_offers
CREATE TABLE job_offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    url VARCHAR(255),
    text TEXT CHECK (char_length(text) <= 5000),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Realtime Configuration
alter publication supabase_realtime add table sponsors;
alter publication supabase_realtime add table job_offers;

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE sponsor_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_offers ENABLE ROW LEVEL SECURITY;

-- Helper function to check if a user is a global_admin
CREATE OR REPLACE FUNCTION is_global_admin(user_uid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles WHERE user_id = user_uid AND role = 'global_admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 1. sponsor_categories
-- Anyone can read (so public site works), only global_admins can modify
CREATE POLICY "Categories are viewable by everyone" ON sponsor_categories FOR SELECT USING (true);
CREATE POLICY "Categories are insertable by admins" ON sponsor_categories FOR INSERT WITH CHECK (is_global_admin(auth.uid()));
CREATE POLICY "Categories are updatable by admins" ON sponsor_categories FOR UPDATE USING (is_global_admin(auth.uid()));
CREATE POLICY "Categories are deletable by admins" ON sponsor_categories FOR DELETE USING (is_global_admin(auth.uid()));


-- 2. sponsors
-- Anyone can read (for public site), only global_admins or assigned contacts can modify
CREATE POLICY "Sponsors are viewable by everyone" ON sponsors FOR SELECT USING (true);
CREATE POLICY "Sponsors are insertable by admins" ON sponsors FOR INSERT WITH CHECK (is_global_admin(auth.uid()));
CREATE POLICY "Sponsors are deletable by admins" ON sponsors FOR DELETE USING (is_global_admin(auth.uid()));

CREATE POLICY "Sponsors are updatable by admins or assigned contacts" ON sponsors FOR UPDATE USING (
    is_global_admin(auth.uid()) OR 
    EXISTS (SELECT 1 FROM sponsor_users WHERE sponsor_id = id AND user_id = auth.uid())
);


-- 3. user_roles
-- Users can see their own role, admins can see all roles and assign roles
CREATE POLICY "Users can see their own role" ON user_roles FOR SELECT USING (auth.uid() = user_id OR is_global_admin(auth.uid()));
CREATE POLICY "Admins can manage user_roles" ON user_roles FOR ALL USING (is_global_admin(auth.uid()));


-- 4. sponsor_users
-- Admins can do anything, Users can see their own assignments
CREATE POLICY "Admins can see and manage sponsor users" ON sponsor_users FOR ALL USING (is_global_admin(auth.uid()));
CREATE POLICY "Users can see their own sponsor assignments" ON sponsor_users FOR SELECT USING (auth.uid() = user_id);


-- 5. job_offers
-- Anyone can read (for public site), only admins or assigned contacts can insert/update/delete
CREATE POLICY "Job offers are viewable by everyone" ON job_offers FOR SELECT USING (true);

CREATE POLICY "Admins can do everything on job_offers" ON job_offers
  USING (is_global_admin(auth.uid()))
  WITH CHECK (is_global_admin(auth.uid()));

CREATE POLICY "Contacts can insert job_offers for their sponsor" ON job_offers FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM sponsor_users WHERE sponsor_id = job_offers.sponsor_id AND user_id = auth.uid()));

CREATE POLICY "Contacts can update their sponsor's job_offers" ON job_offers FOR UPDATE
  USING (EXISTS (SELECT 1 FROM sponsor_users WHERE sponsor_id = job_offers.sponsor_id AND user_id = auth.uid()));

CREATE POLICY "Contacts can delete their sponsor's job_offers" ON job_offers FOR DELETE
  USING (EXISTS (SELECT 1 FROM sponsor_users WHERE sponsor_id = job_offers.sponsor_id AND user_id = auth.uid()));


-- ==========================================
-- STORAGE BUCKETS
-- ==========================================

-- Create the "sponsor_logos" bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'sponsor_logos', 
  'sponsor_logos', 
  true, 
  512000, -- 500KB in bytes
  '{image/png,image/jpeg,image/webp,image/svg+xml}'
) ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
-- Anyone can read logos
CREATE POLICY "Logos are viewable by everyone" ON storage.objects FOR SELECT
USING (bucket_id = 'sponsor_logos');

-- Only authenticated users can upload logos (we could restrict this to contacts/admins specifically via matching paths, but this works generally for now)
CREATE POLICY "Authenticated users can upload logos" ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'sponsor_logos' AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update logos" ON storage.objects FOR UPDATE
USING (bucket_id = 'sponsor_logos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete logos" ON storage.objects FOR DELETE
USING (bucket_id = 'sponsor_logos' AND auth.role() = 'authenticated');

-- ==========================================
-- DEFAULT CATEGORIES
-- ==========================================
INSERT INTO sponsor_categories (name, max_job_offers) VALUES 
('Top', 5),
('Premium', 3),
('Regular', 1),
('Basic', 0),
('Community', 0),
('Media Partner', 0),
('Supporter', 0)
ON CONFLICT (name) DO NOTHING;
