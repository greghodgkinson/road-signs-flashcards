import type { SignCategory } from '../data/roadsigns';

interface Props {
  category: SignCategory;
  name: string;
  size?: number;
}

const CATEGORY_CONFIG: Record<SignCategory, { shape: string; label: string }> = {
  warning: { shape: 'triangle', label: 'W' },
  prohibitory: { shape: 'circle', label: 'P' },
  mandatory: { shape: 'circle-blue', label: 'M' },
  information: { shape: 'rect', label: 'I' },
};

export default function SignPlaceholder({ category, name, size = 180 }: Props) {
  const cfg = CATEGORY_CONFIG[category];
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

  if (cfg.shape === 'triangle') {
    return (
      <svg width={size} height={size} viewBox="0 0 200 200" aria-label={name}>
        <polygon
          points="100,16 188,178 12,178"
          fill="#FFF176"
          stroke="#E53935"
          strokeWidth="10"
          strokeLinejoin="round"
        />
        <text
          x="100"
          y="155"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="52"
          fill="#1a1a1a"
        >
          {initials}
        </text>
      </svg>
    );
  }

  if (cfg.shape === 'circle') {
    return (
      <svg width={size} height={size} viewBox="0 0 200 200" aria-label={name}>
        <circle cx="100" cy="100" r="88" fill="#fff" stroke="#E53935" strokeWidth="12" />
        <line x1="34" y1="34" x2="166" y2="166" stroke="#E53935" strokeWidth="12" strokeLinecap="round" />
        <text
          x="100"
          y="110"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="52"
          fill="#1a1a1a"
        >
          {initials}
        </text>
      </svg>
    );
  }

  if (cfg.shape === 'circle-blue') {
    return (
      <svg width={size} height={size} viewBox="0 0 200 200" aria-label={name}>
        <circle cx="100" cy="100" r="88" fill="#1565C0" stroke="#1565C0" strokeWidth="6" />
        <text
          x="100"
          y="118"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="56"
          fill="#fff"
        >
          {initials}
        </text>
      </svg>
    );
  }

  // rect = information
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 300 180" aria-label={name}>
      <rect x="6" y="6" width="288" height="168" rx="12" fill="#1565C0" stroke="#0D47A1" strokeWidth="6" />
      <text
        x="150"
        y="112"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontWeight="700"
        fontSize="56"
        fill="#fff"
      >
        {initials}
      </text>
    </svg>
  );
}
