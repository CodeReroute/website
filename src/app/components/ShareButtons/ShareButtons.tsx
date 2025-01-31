import React from 'react';
import { assetUrl } from '../utils';
import styles from './share.module.scss';

const siteTitle = 'mappetizer';
const siteDescription = 'a restaurant discovery app.';
const siteUrl =
  typeof window !== 'undefined'
    ? window.location.href
    : 'https://mappetizer.com/';

const shareUrl = 'https://mappetizer.com';
const ShareButtons: React.FC<{ handleClose: () => void }> = ({
  handleClose,
}) => {
  const handleShareClick = (
    platform: 'tikTok' | 'instagram' | 'linkedin',
  ): string => {
    switch (platform) {
      case 'tikTok':
        return `https://www.tiktok.com/share/v2?url=${encodeURIComponent(
          shareUrl,
        )}`;
      case 'instagram':
        return `https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`;
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl,
        )}`;
    }
  };

  return (
    <div className={styles['share-buttons-container']}>
      <p className={styles['share-text']}>
        Unfortunately, your browser does not support sharing. Please use one of
        the following platforms to share this page:
      </p>
      <div className={styles['share-buttons']}>
        <a href={handleShareClick('instagram')} target="_blank">
          <img
            src={assetUrl('/images/social-media/instagramBlack.png')}
            alt="Share on Instagram"
          />
        </a>
        <a href={handleShareClick('tikTok')} target="_blank">
          <img
            src={assetUrl('/images/social-media/tiktokBlack.png')}
            alt="Share on TikTok"
          />
        </a>
        <a href={handleShareClick('linkedin')} target="_blank">
          <img
            src={assetUrl('/images/social-media/linkedinBlack.png')}
            alt="Share on LinkedIn"
          />
        </a>
      </div>
      <div className={styles['button-wrapper']}>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default ShareButtons;
