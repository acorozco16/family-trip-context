
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
      <svg viewBox="0 0 80 32" className="w-full h-full">
        <text 
          x="40" 
          y="22" 
          textAnchor="middle" 
          className="fill-blue-700 font-bold"
          style={{ fontFamily: 'Nunito, sans-serif', fontSize: '20px' }}
        >
          fam
        </text>
        <circle cx="65" cy="12" r="2.5" fill="#f97316" opacity="0.6" />
      </svg>
    </div>
  );
};
