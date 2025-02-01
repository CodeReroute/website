import React from 'react';

interface CloseIconProps {
  className?: string;
  onClick?: () => unknown;
}

const CloseIcon: React.FC<CloseIconProps> = ({ className, onClick }) => {
  return (
    <svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      onClick={onClick}
    >
      <path
        fill="#fff"
        d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7a.996.996 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"
      ></path>
    </svg>
  );
};

export default CloseIcon;
