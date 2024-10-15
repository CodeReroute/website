import React from 'react';
import Hero from './Hero';
import Footer from './Footer';
import Meantime from './Meantime';
import Product from './Product';
import TimelineArea from './TimelineArea';

const BetaTesters: React.FC = () => {
  return (
    <>
      <Hero />
      <TimelineArea />
      <Meantime />
      <Product />
      <Footer />
    </>
  );
};

export default BetaTesters;
