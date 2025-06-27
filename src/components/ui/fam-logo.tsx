
import React from 'react';

interface FamLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const FamLogo = ({ size = 'md', className = '' }: FamLogoProps) => {
  const sizeClasses = {
    sm: 'w-12 h-6',
    md: 'w-16 h-8', 
    lg: 'w-20 h-10'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 60 24" className="w-full h-full">
        <text 
          x="30" 
          y="16" 
          textAnchor="middle" 
          className="fill-blue-700 font-bold text-lg"
          style={{ fontFamily: 'Nunito, sans-serif', fontSize: '16px' }}
        >
          fam
        </text>
        <circle cx="50" cy="8" r="2" fill="#f97316" opacity="0.6" />
      </svg>
    </div>
  );
};
