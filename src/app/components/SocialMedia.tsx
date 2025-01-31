'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './social-media.module.scss';
import { mergeClassNames } from './utils/mergeClassNames';

interface SocialMediaProps {
  instagramUrl?: string;
  instagramIcon?: string;
  tiktokUrl?: string;
  tiktokIcon?: string;
  linkedinUrl?: string;
  linkedinIcon?: string;
  className?: string;
  customStyles?: React.CSSProperties;
}

const SocialMedia: React.FC<SocialMediaProps> = ({
  instagramUrl,
  instagramIcon,
  tiktokUrl,
  tiktokIcon,
  linkedinUrl,
  linkedinIcon,
  className,
  customStyles,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 560);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={mergeClassNames(styles['social-media'], className)}
      style={customStyles}
    >
      {/* Instagram Link */}
      {instagramUrl && instagramIcon && (
        <a
          className={styles['iconContainer']}
          target="_blank"
          href={instagramUrl}
          rel="noopener noreferrer"
        >
          <Image
            src={instagramIcon}
            alt="Instagram"
            title="Instagram"
            width={isMobile ? 25 : 35}
            height={isMobile ? 25 : 35}
          />
        </a>
      )}

      {/* TikTok Link */}
      {tiktokUrl && tiktokIcon && (
        <a
          className={styles['iconContainer']}
          target="_blank"
          href={tiktokUrl}
          rel="noopener noreferrer"
        >
          <Image
            src={tiktokIcon}
            alt="TikTok"
            title="TikTok"
            width={isMobile ? 25 : 35}
            height={isMobile ? 25 : 35}
          />
        </a>
      )}

      {/* LinkedIn Link */}
      {linkedinUrl && linkedinIcon && (
        <a
          className={styles['iconContainer']}
          target="_blank"
          href={linkedinUrl}
          rel="noopener noreferrer"
        >
          <Image
            src={linkedinIcon}
            alt="LinkedIn"
            title="LinkedIn"
            width={isMobile ? 25 : 35}
            height={isMobile ? 25 : 35}
          />
        </a>
      )}
    </div>
  );
};

export default SocialMedia;
