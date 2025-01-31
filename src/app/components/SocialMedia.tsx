'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './social-media.module.scss';
import { mergeClassNames } from './utils/mergeClassNames';
import { assetUrl } from './utils';

interface SocialMediaProps {
  className?: string;
  customStyles?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
  iconContainerStyle?: React.CSSProperties;
}

const SocialMedia: React.FC<SocialMediaProps> = ({ className, customStyles, imageStyle, iconContainerStyle }) => {
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
    <div className={mergeClassNames(styles['social-media'], className)} style={customStyles}>
      {/* Instagram Link */}
      <a
        className={styles['iconContainer']}
        target="_blank"
        href="https://www.instagram.com/_mappetizer"
        rel="noopener noreferrer"
        style={iconContainerStyle}
      >
        <Image
          src={assetUrl('/images/social-media/insta.png')}   
          alt="Instagram"
          title="Instagram"
          width={isMobile ? 25 : 35}
          height={isMobile ? 25 : 35}
          style={imageStyle}
        />
      </a>

      {/* TikTok Link */}
      <a
        className={styles['iconContainer']}
        target="_blank"
        href="https://www.tiktok.com/@mappetizer"
        rel="noopener noreferrer"
        style={iconContainerStyle}
      >
        <Image
          src={assetUrl('/images/social-media/tiktokIcon.png')}
          alt="TikTok"
          title="TikTok"
          width={isMobile ? 25 : 35}
          height={isMobile ? 25 : 35}
          style={imageStyle}
        />
      </a>

      {/* LinkedIn Link */}
      <a
        className={styles['iconContainer']}
        target="_blank"
        href="https://www.linkedin.com/company/mappetizer/about"
        rel="noopener noreferrer"
        style={iconContainerStyle}
      >
        <Image
          src={assetUrl('/images/social-media/linkedinIcon.png')}
          alt="LinkedIn"
          title="LinkedIn"
          width={isMobile ? 25 : 35}
          height={isMobile ? 25 : 35}
          style={imageStyle}
        />
      </a>
    </div>
  );
};

export default SocialMedia;
