import React from 'react';
import styles from './page.module.scss';
import { assetUrl } from '@/app/components/utils';

const Product: React.FC = () => {
  return (
    <div className={styles['product-description']}>
      <div className={styles['product-image-left']}>
        <img
          alt="Food"
          title="Food"
          width={undefined}
          height={undefined}
          src={assetUrl('/images/beta-testers/hero-image.png')}
        />
      </div>
      <div className={styles['product-middle-section']}>
        <h1>We know you're curious</h1>
        <p className={styles['product-middle-section-sub-heading']}>
          HERE'S A QUICK OVERVIEW OF MAPPETIZER
        </p>
        <p className={styles['product-middle-section-customer']}>
          customers 🤝 restaurants
        </p>
        <p className={styles['product-middle-section-paragraph-1']}>
          We’ve identified that the process for restaurant discovery, booking,
          paying and reviewing is fragmented (and low-key annoying). We are
          revolutionizing the way that people dine by streamlining the entire
          process.
        </p>
        <p className={styles['product-middle-section-paragraph-2']}>
          For users, we’re creating an entirely niche social media platform to
          discover restaurants in their city and beyond— and we’ve built clever
          restaurant planning resources that allow users to save restaurants +
          make reservations with friends directly through our app.
        </p>
        <p className={styles['product-middle-section-paragraph-3']}>
          For restaurants, mappetizer is a direct-to-customer marketing platform
          with powerful, yet easy marketing tools and accurate performance
          metrics.
        </p>
      </div>
      <div className={styles['product-image-right']}>
        <img
          alt="Food"
          title="Food"
          width={undefined}
          height={undefined}
          src={assetUrl('/images/beta-testers/hero-image.png')}
        />
      </div>
    </div>
  );
};

export default Product;
