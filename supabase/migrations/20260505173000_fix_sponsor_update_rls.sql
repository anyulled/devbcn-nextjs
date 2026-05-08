DROP POLICY IF EXISTS "Sponsors are updatable by admins or assigned contacts" ON sponsors;

CREATE POLICY "Sponsors are updatable by admins or assigned contacts" ON sponsors
FOR UPDATE
USING (
  is_global_admin(auth.uid())
  OR EXISTS (
    SELECT 1
    FROM sponsor_users
    WHERE sponsor_users.sponsor_id = sponsors.id
      AND sponsor_users.user_id = auth.uid()
  )
)
WITH CHECK (
  is_global_admin(auth.uid())
  OR EXISTS (
    SELECT 1
    FROM sponsor_users
    WHERE sponsor_users.sponsor_id = sponsors.id
      AND sponsor_users.user_id = auth.uid()
  )
);
