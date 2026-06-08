import { useEffect, useState } from 'react';
import { saveScore, fetchHighScore, fetchScores, type ScoreRecord } from '../lib/supabase';

interface Props {
  score: number;
  total: number;
  onPlayAgain: () => void;
  onHome: () => void;
}

function ScoreRing({ score, total }: { score: number; total: number }) {
  const pct = score / total;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * pct;

  return (
    <div className="score-ring-wrapper">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={pct >= 0.75 ? '#22c55e' : pct >= 0.5 ? '#f59e0b' : '#ef4444'}
          strokeWidth="12"
          strokeDasharray={`${dash} ${circumference}`}
          strokeDashoffset={circumference / 4}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.8s ease' }}
        />
      </svg>
      <div className="score-ring-text">
        <span className="score-ring-num">{score}</span>
        <span className="score-ring-denom">/ {total}</span>
      </div>
    </div>
  );
}

function grade(score: number, total: number): { label: string; color: string } {
  const pct = score / total;
  if (pct === 1) return { label: 'Perfect!', color: '#22c55e' };
  if (pct >= 0.9) return { label: 'Excellent!', color: '#22c55e' };
  if (pct >= 0.75) return { label: 'Good Job!', color: '#84cc16' };
  if (pct >= 0.5) return { label: 'Keep Practising', color: '#f59e0b' };
  return { label: 'Try Again', color: '#ef4444' };
}

export default function ResultsScreen({ score, total, onPlayAgain, onHome }: Props) {
  const [saved, setSaved] = useState(false);
  const [highScore, setHighScore] = useState<number | null>(null);
  const [recentScores, setRecentScores] = useState<ScoreRecord[]>([]);
  const [isNewHigh, setIsNewHigh] = useState(false);

  useEffect(() => {
    async function persist() {
      const [prevHigh] = await Promise.all([fetchHighScore()]);
      await saveScore(score, total);
      const [newHigh, recent] = await Promise.all([fetchHighScore(), fetchScores()]);
      setHighScore(newHigh);
      setRecentScores(recent);
      setIsNewHigh(score > prevHigh);
      setSaved(true);
    }
    persist();
  }, [score, total]);

  const { label, color } = grade(score, total);

  return (
    <div className="screen results-screen">
      <div className="results-hero">
        {isNewHigh && (
          <div className="new-high-badge">New High Score!</div>
        )}
        <p className="results-grade" style={{ color }}>{label}</p>
        <ScoreRing score={score} total={total} />
        <p className="results-subtitle">
          You answered <strong>{score}</strong> out of <strong>{total}</strong> correctly
        </p>
      </div>

      {saved && highScore !== null && (
        <div className="results-stats">
          <div className="stat-card">
            <span className="stat-label">High Score</span>
            <span className="stat-value">{highScore} / {total}</span>
          </div>
        </div>
      )}

      <div className="results-actions">
        <button className="btn btn-primary btn-large" onClick={onPlayAgain}>
          Play Again
        </button>
        <button className="btn btn-secondary btn-large" onClick={onHome}>
          Home
        </button>
      </div>

      {recentScores.length > 0 && (
        <div className="recent-scores">
          <h3 className="recent-scores-title">Recent Scores</h3>
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
                  <span className={`score-dot score-dot--${dot}`} />
                  <span className="score-row-val">
                    {s.score} / {s.total}
                  </span>
                  <span className="score-row-date">{date}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
