CREATE TYPE sponsor_status AS ENUM ('draft', 'published', 'needs_review');

ALTER TABLE sponsors
  ADD COLUMN status sponsor_status NOT NULL DEFAULT 'published',
  ADD COLUMN internal_owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE sponsor_users
  ADD COLUMN email VARCHAR(255),
  ADD COLUMN name VARCHAR(255);

UPDATE sponsor_users
SET email = lower(auth.users.email)
FROM auth.users
WHERE sponsor_users.user_id = auth.users.id
  AND sponsor_users.email IS NULL;

UPDATE sponsor_users
SET name = COALESCE(name, NULLIF(auth.users.raw_user_meta_data->>'full_name', ''))
FROM auth.users
WHERE sponsor_users.user_id = auth.users.id
  AND sponsor_users.name IS NULL;

CREATE UNIQUE INDEX sponsor_users_sponsor_id_email_unique
ON sponsor_users (sponsor_id, lower(email))
WHERE email IS NOT NULL;

DROP POLICY IF EXISTS "Admins can see and manage sponsor users" ON sponsor_users;
DROP POLICY IF EXISTS "Users can see their own sponsor assignments" ON sponsor_users;

CREATE POLICY "Admins can view sponsor users" ON sponsor_users
FOR SELECT
USING (is_global_admin(auth.uid()));

CREATE POLICY "Admins can insert sponsor users" ON sponsor_users
FOR INSERT
WITH CHECK (is_global_admin(auth.uid()));

CREATE POLICY "Admins can update sponsor users" ON sponsor_users
FOR UPDATE
USING (is_global_admin(auth.uid()))
WITH CHECK (is_global_admin(auth.uid()));

CREATE POLICY "Admins can delete sponsor users" ON sponsor_users
FOR DELETE
USING (is_global_admin(auth.uid()));

CREATE POLICY "Users can see their own sponsor assignments" ON sponsor_users
FOR SELECT
USING (auth.uid() = user_id);
