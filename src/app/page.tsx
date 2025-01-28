import React from 'react';
import Image from 'next/image';
import styles from './page.module.scss';
import { assetUrl } from './components/utils';

const Home: React.FC = () => {
  return (
    <div className={styles['main-wrapper']}>
      <header>
        <Image
          className={styles.logo}
          src={assetUrl('/images/logo.png')}
          alt="Mappetizer"
          title="Mappetizer"
          width={150}
          height={20.5}
        />
        <h4 className={styles['coming-soon']}>COMING SOON</h4>
      </header>
      <div className={styles['bottom-section']}>
        <div className={styles['text-wrapper']}>
          <h1>PAUSE.</h1>
          <h3>
            WE ARE UPDATING OUR SITE.
            <br />
            CHECK BACK EARLY FEB.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
