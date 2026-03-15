-- Drop the grade check constraint
-- API validates grade server-side, DB constraint causes issues with edge-cached old code
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_grade_check;

-- Also relax grade column to allow 0 (unset) as a safe fallback
ALTER TABLE public.users ALTER COLUMN grade SET DEFAULT 1;
