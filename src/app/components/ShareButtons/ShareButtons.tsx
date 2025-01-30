import React from 'react';
import { assetUrl } from '../utils';
import styles from './share.module.scss';

const siteTitle = 'mappetizer';
const siteDescription = 'a restaurant discovery app.';
const siteUrl =
  typeof window !== 'undefined'
    ? window.location.href
    : 'https://mappetizer.com/';
const ShareButtons: React.FC = () => {
  return (
    <div className={styles['share-buttons']}>
      <a
        href={`https://www.instagram.com/sharer/sharer.php?u=${siteUrl}`}
        target="_blank"
      >
        <img
          src={assetUrl('/images/social-media/instagramBlack.png')}
          alt="Share on Instagram"
        />
      </a>
      <a href={`https://www.tiktok.com/share?url=${siteUrl}`} target="_blank">
        <img
          src={assetUrl('/images/social-media/tiktokBlack.png')}
          alt="Share on Tiktok"
        />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${siteUrl}&title=${siteTitle}&summary=${siteDescription}&source=mappetizer-website`}
        target="_blank"
      >
        <img
          src={assetUrl('/images/social-media/linkedinBlack.png')}
          alt="Share on LinkedIn"
        />
      </a>
    </div>
  );
};

export default ShareButtons;
