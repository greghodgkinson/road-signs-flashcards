import { useEffect, useState } from 'react';
import { fetchHighScore, fetchScores, type ScoreRecord } from '../lib/supabase';
import { ROAD_SIGNS } from '../data/roadsigns';

interface Props {
  onStart: () => void;
  onLibrary: () => void;
}

export default function HomeScreen({ onStart, onLibrary }: Props) {
  const [highScore, setHighScore] = useState<number | null>(null);
  const [recentScores, setRecentScores] = useState<ScoreRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [hs, recent] = await Promise.all([fetchHighScore(), fetchScores()]);
      setHighScore(hs);
      setRecentScores(recent);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="screen home-screen">
      <div className="home-hero">
        <div className="home-icon" aria-hidden="true">
          <svg viewBox="0 0 64 64" width="72" height="72">
            <polygon points="32,4 60,58 4,58" fill="#FFF176" stroke="#E53935" strokeWidth="4" strokeLinejoin="round" />
            <text x="32" y="50" textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="700" fontSize="24" fill="#1a1a1a">!</text>
          </svg>
        </div>
        <h1 className="home-title">Road Signs</h1>
        <p className="home-subtitle">Quiz</p>
      </div>

      {!loading && (
        <div className="home-stats">
          <div className="home-stat">
            <span className="home-stat-value">{highScore ?? 0} / 20</span>
            <span className="home-stat-label">High Score</span>
          </div>
          <div className="home-stat-divider" />
          <div className="home-stat">
            <span className="home-stat-value">{recentScores.length}</span>
            <span className="home-stat-label">Quizzes Taken</span>
          </div>
          <div className="home-stat-divider" />
          <div className="home-stat">
            <span className="home-stat-value">{ROAD_SIGNS.length}</span>
            <span className="home-stat-label">Signs in Library</span>
          </div>
        </div>
      )}

      <div className="home-actions">
        <button className="btn btn-primary btn-xl" onClick={onStart}>
          Start Quiz
          <span className="btn-sub">20 random signs</span>
        </button>
        <button className="btn btn-ghost-outline" onClick={onLibrary}>
          Browse Library
        </button>
      </div>

      {recentScores.length > 0 && (
        <div className="home-recent">
          <h3 className="home-recent-title">Last 10 Scores</h3>
          <div className="score-list">
            {recentScores.map((s, i) => {
              const pct = s.score / s.total;
              const dot = pct >= 0.75 ? 'green' : pct >= 0.5 ? 'amber' : 'red';
              const date = new Date(s.created_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              });
              return (
                <div key={s.id} className={`score-row${i === 0 ? ' score-row--latest' : ''}`}>
                  <span className="score-row-rank">#{i + 1}</span>
                  <span className={`score-dot score-dot--${dot}`} />
                  <span className="score-row-val">{s.score} / {s.total}</span>
                  <span className="score-row-date">{date}</span>
                  <span className="score-row-pct">{Math.round(pct * 100)}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!loading && recentScores.length === 0 && (
        <p className="home-no-scores">No quizzes yet — take your first quiz!</p>
      )}
    </div>
  );
}
