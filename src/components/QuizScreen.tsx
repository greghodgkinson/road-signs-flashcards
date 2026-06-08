import { useState } from 'react';
import type { RoadSign } from '../data/roadsigns';
import FlashCard from './FlashCard';

interface Props {
  signs: RoadSign[];
  onComplete: (score: number, total: number) => void;
  onCancel: () => void;
}

export default function QuizScreen({ signs, onComplete, onCancel }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const currentSign = signs[currentIndex];
  const total = signs.length;

  function handleCorrect() {
    const newScore = score + 1;
    setScore(newScore);
    advance(newScore);
  }

  function handleIncorrect() {
    advance(score);
  }

  function advance(currentScore: number) {
    if (currentIndex + 1 >= total) {
      onComplete(currentScore, total);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  return (
    <div className="screen quiz-screen">
      <div className="quiz-header">
        <button className="btn-ghost" onClick={onCancel} aria-label="Cancel quiz">
          ✕ Cancel
        </button>
        <div className="score-live">
          <span className="score-live-num">{score}</span>
          <span className="score-live-denom"> / {total}</span>
        </div>
      </div>

      <FlashCard
        key={currentSign.id}
        sign={currentSign}
        cardNumber={currentIndex + 1}
        total={total}
        onCorrect={handleCorrect}
        onIncorrect={handleIncorrect}
      />
    </div>
  );
}
