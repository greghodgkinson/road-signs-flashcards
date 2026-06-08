import { useState } from 'react';
import { ROAD_SIGNS, type SignCategory } from '../data/roadsigns';
import SignPlaceholder from './SignPlaceholder';

interface Props {
  onBack: () => void;
}

const CATEGORIES: { value: SignCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'warning', label: 'Warning' },
  { value: 'prohibitory', label: 'Prohibitory' },
  { value: 'mandatory', label: 'Mandatory' },
  { value: 'information', label: 'Information' },
];

export default function LibraryScreen({ onBack }: Props) {
  const [filter, setFilter] = useState<SignCategory | 'all'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const visible = filter === 'all' ? ROAD_SIGNS : ROAD_SIGNS.filter((s) => s.category === filter);

  return (
    <div className="screen library-screen">
      <div className="library-header">
        <button className="btn-ghost" onClick={onBack} aria-label="Back">
          ← Back
        </button>
        <h2 className="library-title">Sign Library</h2>
        <span className="library-count">{visible.length}</span>
      </div>

      <div className="filter-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            className={`filter-tab${filter === cat.value ? ' active' : ''}`}
            onClick={() => setFilter(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="library-grid">
        {visible.map((sign) => (
          <div
            key={sign.id}
            className={`library-card${expanded === sign.id ? ' library-card--expanded' : ''}`}
            onClick={() => setExpanded(expanded === sign.id ? null : sign.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setExpanded(expanded === sign.id ? null : sign.id)}
          >
            <div className="library-card-image">
              {sign.imagePath ? (
                <img src={sign.imagePath} alt={sign.name} />
              ) : (
                <SignPlaceholder category={sign.category} name={sign.name} size={80} />
              )}
            </div>
            <div className="library-card-info">
              <p className="library-card-name">{sign.name}</p>
              <span className={`library-cat-badge cat-${sign.category}`}>{sign.category}</span>
            </div>
            {expanded === sign.id && (
              <p className="library-card-desc">{sign.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
