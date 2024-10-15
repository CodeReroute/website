import React from 'react';
import Image from 'next/image';
import styles from './social-media.module.scss';
import { assetUrl } from './utils';
import { mergeClassNames } from './utils/mergeClassNames';

const SocialMedia: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={mergeClassNames(styles['social-media'], className)}>
      <a target="_blank" href="https://www.instagram.com/_mappetizer">
        <Image
          className={styles['social-media']}
          src={assetUrl('/images/social-media/instagram.png')}
          alt="Instagram"
          title="Instagram"
          width={25}
          height={25}
        />
      </a>
      <a target="_blank" href="https://www.tiktok.com/@mappetizer">
        <Image
          className={styles['social-media']}
          src={assetUrl('/images/social-media/tiktok.png')}
          alt="TikTok"
          title="TikTok"
          width={25}
          height={25}
        />
      </a>
      <a
        target="_blank"
        href="https://www.linkedin.com/company/mappetizer/about"
      >
        <Image
          className={styles['social-media']}
          src={assetUrl('/images/social-media/linkedin.png')}
          alt="LinkedIn"
          title="LinkedIn"
          width={25}
          height={25}
        />
      </a>
    </div>
  );
};

export default SocialMedia;
