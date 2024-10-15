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
          There are no effective direct-to-customer marketing platforms in the
          restaurant industry. Currently, restaurants advertise on large social
          media platforms such as Meta, TikTok and X. This is a problem because
          audiences are broad and there is lack of clarity about ad
          click-through rates and conversions (ie. how many people came to the
          restaurant after seeing an online ad).
        </p>
        <p className={styles['product-middle-section-paragraph-2']}>
          Clearly, videos featuring food and restaurants is a popular genre
          across all existing social media platforms but the user journey ends
          when the video is over.
        </p>
        <p className={styles['product-middle-section-paragraph-3']}>
          We’ve seen applications built for online reservations and applications
          built for restaurant discovery but they lack a thriving ecosystem of
          engaged users.
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
