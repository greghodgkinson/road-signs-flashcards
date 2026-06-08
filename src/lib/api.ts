export interface ScoreRecord {
  id: number;
  score: number;
  total: number;
  created_at: string;
}

interface ScoresResponse {
  scores: ScoreRecord[];
  highScore: number;
}

interface SaveResponse {
  record: ScoreRecord;
  scores: ScoreRecord[];
  highScore: number;
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} failed (${res.status})`);
  return res.json() as Promise<T>;
}

export async function fetchScoresData(): Promise<ScoresResponse> {
  return getJson<ScoresResponse>('/api/scores');
}

export async function fetchScores(): Promise<ScoreRecord[]> {
  const { scores } = await fetchScoresData();
  return scores;
}

export async function fetchHighScore(): Promise<number> {
  const { highScore } = await fetchScoresData();
  return highScore;
}

export async function saveScore(
  score: number,
  total = 20
): Promise<SaveResponse | null> {
  const res = await fetch('/api/scores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ score, total }),
  });
  if (!res.ok) {
    console.error('Failed to save score:', res.status);
    return null;
  }
  return res.json() as Promise<SaveResponse>;
}
