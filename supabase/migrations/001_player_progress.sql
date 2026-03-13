-- Bảng lưu progress người chơi
create table player_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  level int default 1,
  xp int default 0,
  stars int default 0,
  gems int default 0,
  streak int default 0,
  last_play_date text,
  skill_progress jsonb default '{}',
  achievements jsonb default '{}',
  daily jsonb default '{}',
  total_correct int default 0,
  total_played int default 0,
  max_combo int default 0,
  corgi_taps int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id)
);

-- RLS
alter table player_progress enable row level security;
create policy "Users can read own data" on player_progress for select using (auth.uid() = user_id);
create policy "Users can insert own data" on player_progress for insert with check (auth.uid() = user_id);
create policy "Users can update own data" on player_progress for update using (auth.uid() = user_id);
