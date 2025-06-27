
import React from 'react';

interface FamLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const FamLogo = ({ size = 'md', className = '' }: FamLogoProps) => {
  const sizeClasses = {
    sm: 'w-20 h-10',
    md: 'w-24 h-12', 
    lg: 'w-28 h-14'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 96 40" className="w-full h-full">
        <text 
          x="48" 
          y="28" 
          textAnchor="middle" 
          className="fill-blue-700 font-bold"
          style={{ fontFamily: 'Nunito, sans-serif', fontSize: '24px' }}
        >
          fam
        </text>
      </svg>
    </div>
  );
};
