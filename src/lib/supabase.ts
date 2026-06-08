import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ScoreRecord {
  id: string;
  score: number;
  total: number;
  created_at: string;
}

export async function saveScore(score: number, total = 20): Promise<ScoreRecord | null> {
  const { data, error } = await supabase
    .from('scores')
    .insert({ score, total })
    .select()
    .maybeSingle();
  if (error) {
    console.error('Error saving score:', error);
    return null;
  }
  return data;
}

export async function fetchScores(): Promise<ScoreRecord[]> {
  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);
  if (error) {
    console.error('Error fetching scores:', error);
    return [];
  }
  return data ?? [];
}

export async function fetchHighScore(): Promise<number> {
  const { data, error } = await supabase
    .from('scores')
    .select('score')
    .order('score', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error('Error fetching high score:', error);
    return 0;
  }
  return data?.score ?? 0;
}
