export interface Team {
  id: number;
  created_at: string;
  name: string;
  logo_url: string | null;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
  pool: 'A' | 'B' | null; // Allow null for legacy/unassigned teams
}

export interface Match {
  id: number;
  created_at: string;
  home_team_id: number;
  away_team_id: number;
  home_score: number | null;
  away_score: number | null;
  match_date: string;
  status: 'upcoming' | 'live' | 'completed' | 'postponed';
  stage: string;
  home_team?: {
    name: string;
    logo_url: string | null;
  };
  away_team?: {
    name: string;
    logo_url: string | null;
  };
}
