
import React from 'react';

interface FamLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const FamLogo = ({ size = 'md', className = '' }: FamLogoProps) => {
  const sizeClasses = {
    sm: 'w-16 h-8',
    md: 'w-20 h-10', 
    lg: 'w-24 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 120 40" className="w-full h-full">
        {/* F - Airplane */}
        <g transform="translate(5, 8)">
          <path 
            d="M2 12 L18 12 L18 8 L14 8 L14 4 L10 4 L10 8 L6 8 L6 12 L2 12 M2 16 L10 16 L10 20 L6 20 L6 24 L14 24 L14 20 L10 20 L10 16 L18 16" 
            fill="#2563eb" 
            className="drop-shadow-sm"
          />
          <circle cx="8" cy="6" r="1.5" fill="#f97316" />
          <circle cx="12" cy="6" r="1.5" fill="#f97316" />
        </g>

        {/* A - Mountain/Tent */}
        <g transform="translate(45, 8)">
          <path 
            d="M10 24 L2 24 L8 8 L12 8 L18 24 L10 24 M7 18 L13 18" 
            fill="#059669" 
            className="drop-shadow-sm"
          />
          <path 
            d="M8 8 L12 8 L10 4 Z" 
            fill="#f97316"
          />
          <circle cx="6" cy="22" r="1" fill="#fbbf24" />
          <circle cx="14" cy="22" r="1" fill="#fbbf24" />
        </g>

        {/* M - Suitcase */}
        <g transform="translate(85, 8)">
          <rect x="2" y="12" width="16" height="12" rx="2" fill="#7c3aed" className="drop-shadow-sm" />
          <rect x="4" y="14" width="12" height="8" rx="1" fill="#a855f7" />
          <rect x="8" y="10" width="4" height="4" rx="1" fill="#6366f1" />
          <circle cx="6" cy="18" r="1" fill="#fbbf24" />
          <circle cx="14" cy="18" r="1" fill="#fbbf24" />
          <rect x="1" y="24" width="18" height="2" rx="1" fill="#374151" />
        </g>

        {/* Travel trail connecting the letters */}
        <path 
          d="M25 16 Q35 12 42 16 Q52 20 55 16 Q65 12 72 16 Q82 20 85 16" 
          stroke="#cbd5e1" 
          strokeWidth="1.5" 
          fill="none" 
          strokeDasharray="3,2"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};
