-- Bảng đơn giản lưu toàn bộ game state (không cần auth)
-- Chạy SQL này trong Supabase SQL Editor

create table if not exists game_progress (
  id serial primary key,
  player_id text unique not null,
  data jsonb not null default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Cho phép tất cả thao tác (game trẻ em, không cần auth phức tạp)
alter table game_progress enable row level security;
create policy "allow_all_game_progress" on game_progress
  for all using (true) with check (true);

-- Index nhanh
create index if not exists idx_game_progress_player on game_progress(player_id);
