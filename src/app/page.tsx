'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import { assetUrl } from './components/utils';
import React, {useRef} from 'react';

export default function Home() {
  const sectionTop = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div ref={sectionTop} className={styles.hero}>
        <div className={styles.header}>
          <Image
            className={styles.logo}
            src={assetUrl('/images/logo.png')}
            alt="Mappetizer"
            title="Mappetizer"
            width={150}
            height={40}
          />

          <h1 className={styles['right-text']}>COMING SOON</h1>
        </div>
        <div className={styles['header-line']} />

        {/* Middle section */}
        <div className={styles.middleSection}>
          <h1>PAUSE.</h1>
          <h3>
          <span>we are updating our site.</span> <br />
          <span>check back early feb.</span>
          </h3>
        </div>
      </div>
    </div>
  );
}
