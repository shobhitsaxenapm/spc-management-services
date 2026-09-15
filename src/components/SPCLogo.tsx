import React from 'react';

interface SPCLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  dark?: boolean;
}

export function SPCLogo({ className = '', size = 'md' }: SPCLogoProps) {
  const heights = { sm: 48, md: 56, lg: 72 };

  return (
    <img
      src="/spc-logo.svg"
      alt="SPC Management"
      width={498}
      height={183}
      style={{ height: heights[size], width: 'auto' }}
      className={`block shrink-0 ${className}`}
    />
  );
}
