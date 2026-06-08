import { useState } from 'react';
import type { RoadSign } from '../data/roadsigns';
import SignPlaceholder from './SignPlaceholder';

interface Props {
  sign: RoadSign;
  cardNumber: number;
  total: number;
  onCorrect: () => void;
  onIncorrect: () => void;
}

export default function FlashCard({ sign, cardNumber, total, onCorrect, onIncorrect }: Props) {
  const [flipped, setFlipped] = useState(false);

  function handleFlip() {
    if (!flipped) setFlipped(true);
  }

  function handleAnswer(correct: boolean) {
    setFlipped(false);
    // Small delay so the card can visually reset before the next card mounts
    setTimeout(() => {
      if (correct) onCorrect();
      else onIncorrect();
    }, 180);
  }

  const categoryLabel: Record<string, string> = {
    warning: 'Warning',
    prohibitory: 'Prohibitory',
    mandatory: 'Mandatory',
    information: 'Information',
  };

  return (
    <div className="flashcard-wrapper">
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${((cardNumber - 1) / total) * 100}%` }}
        />
      </div>

      <div className="card-counter">
        {cardNumber} / {total}
      </div>

      <div
        className={`card-scene${flipped ? ' is-flipped' : ''}`}
        onClick={handleFlip}
        role="button"
        aria-label={flipped ? 'Card showing answer' : 'Tap to reveal sign name'}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleFlip()}
      >
        <div className="card-inner">
          {/* FRONT */}
          <div className="card-face card-front">
            <div className="card-category-badge" data-cat={sign.category}>
              {categoryLabel[sign.category]}
            </div>
            <div className="card-sign-image">
              {sign.imagePath ? (
                <img src={sign.imagePath} alt={sign.name} />
              ) : (
                <SignPlaceholder category={sign.category} name={sign.name} size={200} />
              )}
            </div>
            <p className="card-tap-hint">Tap to reveal</p>
          </div>

          {/* BACK */}
          <div className="card-face card-back">
            <div className="card-category-badge" data-cat={sign.category}>
              {categoryLabel[sign.category]}
            </div>
            <div className="card-sign-image card-sign-image--small">
              {sign.imagePath ? (
                <img src={sign.imagePath} alt={sign.name} />
              ) : (
                <SignPlaceholder category={sign.category} name={sign.name} size={100} />
              )}
            </div>
            <h2 className="card-name">{sign.name}</h2>
            <p className="card-description">{sign.description}</p>
          </div>
        </div>
      </div>

      {flipped && (
        <div className="answer-buttons">
          <button
            className="btn btn-incorrect"
            onClick={() => handleAnswer(false)}
          >
            <span className="btn-icon">✗</span> Incorrect
          </button>
          <button
            className="btn btn-correct"
            onClick={() => handleAnswer(true)}
          >
            <span className="btn-icon">✓</span> Correct
          </button>
        </div>
      )}

      {!flipped && (
        <div className="tap-prompt">
          <span>Tap the card to reveal the answer</span>
        </div>
      )}
    </div>
  );
}
