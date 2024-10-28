import React from 'react';
import Footer from '../beta-testers/Footer';
import Hero from '../beta-testers/Hero';
import Meantime from '../beta-testers/Meantime';
import Product from '../beta-testers/Product';
import TimelineArea from '../beta-testers/TimelineArea';
import styles from '../beta-testers/page.module.scss';

const Waitlist: React.FC = () => {
  return (
    <div className={styles['main-waitlist']}>
      <Hero />
      <TimelineArea />
      <Meantime />
      <Product />
      <Footer />
    </div>
  );
};

export default Waitlist;
