-- Replace overly permissive RLS policy on game_progress
-- The API now verifies ownership via signed session cookies,
-- but RLS is defense-in-depth in case anon key is used directly.

-- Drop the old allow-all policy
DROP POLICY IF EXISTS "allow_all_game_progress" ON game_progress;

-- Since we use service_role_key in the API (which bypasses RLS),
-- these policies protect against direct anon-key access from the browser.

-- Allow reading only own progress (player_id starts with the user's username)
-- Note: For anon-key access, we deny everything. Only service_role bypasses.
CREATE POLICY "deny_anon_read" ON game_progress
  FOR SELECT USING (false);

CREATE POLICY "deny_anon_insert" ON game_progress
  FOR INSERT WITH CHECK (false);

CREATE POLICY "deny_anon_update" ON game_progress
  FOR UPDATE USING (false);

CREATE POLICY "deny_anon_delete" ON game_progress
  FOR DELETE USING (false);

-- Also lock down the users table if RLS is not enabled
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables
    WHERE tablename = 'users' AND rowsecurity = true
  ) THEN
    ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Deny all anon access to users table (API uses service_role)
DROP POLICY IF EXISTS "allow_all_users" ON public.users;

CREATE POLICY "deny_anon_users_select" ON public.users
  FOR SELECT USING (false);

CREATE POLICY "deny_anon_users_insert" ON public.users
  FOR INSERT WITH CHECK (false);

CREATE POLICY "deny_anon_users_update" ON public.users
  FOR UPDATE USING (false);

CREATE POLICY "deny_anon_users_delete" ON public.users
  FOR DELETE USING (false);
