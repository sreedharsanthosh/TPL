-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- TEAMS TABLE
create table public.teams (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  logo_url text,
  manager_name text,
  manager_image_url text,
  manager2_name text,
  manager2_image_url text,
  played integer default 0,
  wins integer default 0,
  draws integer default 0,
  losses integer default 0,
  points integer default 0,
  goal_difference integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PLAYERS TABLE
create table public.players (
  id uuid primary key default uuid_generate_v4(),
  team_id uuid references public.teams(id) on delete cascade not null,
  name text not null,
  image_url text,
  goals integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- MATCHES TABLE
create table public.matches (
  id uuid primary key default uuid_generate_v4(),
  home_team_id uuid references public.teams(id) on delete cascade not null,
  away_team_id uuid references public.teams(id) on delete cascade not null,
  home_score integer,
  away_score integer,
  match_date timestamp with time zone not null,
  stage text not null, -- 'League', 'Semi-Final', 'Final'
  status text default 'upcoming', -- 'upcoming', 'completed'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ENABLE ROW LEVEL SECURITY
alter table public.teams enable row level security;
alter table public.players enable row level security;
alter table public.matches enable row level security;

-- POLICIES
-- Allow public read access to all tables
create policy "Enable read access for all users" on public.teams for select using (true);
create policy "Enable read access for all users" on public.players for select using (true);
create policy "Enable read access for all users" on public.matches for select using (true);

-- Allow authenticated users (admin) to insert/update/delete
create policy "Enable restricted access for authenticated users" on public.teams for all using (auth.role() = 'authenticated');
create policy "Enable restricted access for authenticated users" on public.players for all using (auth.role() = 'authenticated');
create policy "Enable restricted access for authenticated users" on public.matches for all using (auth.role() = 'authenticated');
