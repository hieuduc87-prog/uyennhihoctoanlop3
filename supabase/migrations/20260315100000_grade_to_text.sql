-- Migrate grade column from INT to TEXT to support pre-school levels (pre_4, pre_5)
-- Existing numeric values (1-5) → string IDs (lop1-lop5)

-- Step 1: Add temp column
ALTER TABLE public.users ADD COLUMN grade_new TEXT DEFAULT 'lop1';

-- Step 2: Migrate existing data
UPDATE public.users SET grade_new = 'lop' || grade::text WHERE grade IS NOT NULL AND grade >= 1 AND grade <= 5;
UPDATE public.users SET grade_new = 'lop1' WHERE grade IS NULL OR grade < 1 OR grade > 5;

-- Step 3: Drop old column and rename
ALTER TABLE public.users DROP COLUMN grade;
ALTER TABLE public.users RENAME COLUMN grade_new TO grade;
