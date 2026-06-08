import { useState } from 'react';
import type { RoadSign } from '../data/roadsigns';
import FlashCard from './FlashCard';

interface Props {
  signs: RoadSign[];
  onComplete: (score: number, total: number) => void;
  onCancel: () => void;
}

type Phase = 'initial' | 'review';

export default function QuizScreen({ signs, onComplete, onCancel }: Props) {
  const total = signs.length;

  const [phase, setPhase] = useState<Phase>('initial');
  const [initialIndex, setInitialIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongSigns, setWrongSigns] = useState<RoadSign[]>([]);

  // Review phase: a queue where correct = shift off, incorrect = move to back
  const [reviewQueue, setReviewQueue] = useState<RoadSign[]>([]);

  function enterReviewOrComplete(finalScore: number, wrong: RoadSign[]) {
    if (wrong.length > 0) {
      setReviewQueue(wrong);
      setPhase('review');
    } else {
      onComplete(finalScore, total);
    }
  }

  function handleInitialAnswer(correct: boolean) {
    const currentSign = signs[initialIndex];
    const newScore = correct ? score + 1 : score;
    const newWrong = correct ? wrongSigns : [...wrongSigns, currentSign];

    if (correct) setScore(newScore);
    if (!correct) setWrongSigns(newWrong);

    if (initialIndex + 1 >= total) {
      enterReviewOrComplete(newScore, newWrong);
    } else {
      setInitialIndex((i) => i + 1);
    }
  }

  function handleReviewAnswer(correct: boolean) {
    if (correct) {
      const next = reviewQueue.slice(1);
      if (next.length === 0) {
        onComplete(score, total);
      } else {
        setReviewQueue(next);
      }
    } else {
      // Move current sign to back of queue
      setReviewQueue((q) => [...q.slice(1), q[0]]);
    }
  }

  const isReview = phase === 'review';
  const currentSign = isReview ? reviewQueue[0] : signs[initialIndex];

  return (
    <div className="screen quiz-screen">
      <div className="quiz-header">
        <button className="btn-ghost" onClick={onCancel} aria-label="Cancel quiz">
          ✕ Cancel
        </button>
        {isReview ? (
          <div className="review-badge">
            Review · {reviewQueue.length} left
          </div>
        ) : (
          <div className="score-live">
            <span className="score-live-num">{score}</span>
            <span className="score-live-denom"> / {total}</span>
          </div>
        )}
      </div>

      {currentSign && (
        <FlashCard
          key={`${phase}-${currentSign.id}-${isReview ? reviewQueue.length : initialIndex}`}
          sign={currentSign}
          cardNumber={isReview ? undefined : initialIndex + 1}
          total={isReview ? undefined : total}
          reviewRemaining={isReview ? reviewQueue.length : undefined}
          onCorrect={() => (isReview ? handleReviewAnswer(true) : handleInitialAnswer(true))}
          onIncorrect={() => (isReview ? handleReviewAnswer(false) : handleInitialAnswer(false))}
        />
      )}
    </div>
  );
}
