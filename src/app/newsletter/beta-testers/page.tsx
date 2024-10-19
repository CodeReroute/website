import React from 'react';
import Hero from './Hero';
import Footer from './Footer';
import Meantime from './Meantime';
import Product from './Product';
import TimelineArea from './TimelineArea';
import styles from './page.module.scss';

const BetaTesters: React.FC = () => {
  return (
    <div className={styles['main-beta-testers']}>
      <Hero />
      <TimelineArea />
      <Meantime />
      <Product />
      <Footer />
    </div>
  );
};

export default BetaTesters;
