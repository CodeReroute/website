'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import { assetUrl } from './components/utils';
import React, { useRef, useState } from 'react';
import SocialMedia from './components/SocialMedia';

const style: React.CSSProperties = {
  backgroundImage: `linear-gradient(rgba(95, 93, 63, 0.20), rgba(95, 93, 63, 0.20)), url('${assetUrl(
    '/images/map-pattern.png',
  )}')`,
};

interface Slide {
  title: string;
  description: string | JSX.Element;
  img: string;
}

// Function to scroll the slider
const scrollSlider = (
  direction: number,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
  currentIndex: number,
  slides: Slide[],
) => {
  const slider = document.getElementById('horizontalSlider');
  if (slider) {
    const scrollAmount = 300; // Adjust based on your slide width
    slider.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < slides.length) {
      setCurrentIndex(newIndex);
    }
  }
};

const slides = [
  {
    title: 'SAY HI',
    description: 'Meet the team behind this ambitious app build.',
    img: '/images/1.png',
  },
  {
    title: 'THE WAITLIST',
    description: 'Early birds only. Sign up to be among the first app users.',
    img: '/images/2.png',
  },
  {
    title: 'RESTO ROLL CALL',
    description: 'We’re requesting feedback from any and all restaurants.',
    img: '/images/3.png',
  },
  {
    title: 'FOLLOW US',
    description:
      'Support our vision by sharing it with your friends far and wide.',
    img: '/images/4.png',
  },
  {
    title: 'TELL A FRIEND',
    description:
      'Support our vision by sharing it with your friends far and wide.',
    img: '/images/5.png',
  },
];

export default function Home() {
  const sectionTop = useRef<HTMLDivElement>(null);
  const sectionBottom = useRef<HTMLDivElement>(null);
  const sectionFooter = useRef<HTMLDivElement>(null);
  const [showInputSection, setShowInputSection] = useState(false);

  // State to track the current index of the slider
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div>
      <div ref={sectionTop} className={styles.hero}>
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.videoBackground}
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content on Top of the Video */}
        <div className={styles.header}>
          <Image
            className={styles.logo}
            src={assetUrl('/images/logo.png')}
            alt="Mappetizer"
            title="Mappetizer"
            width={150}
            height={40}
          />
          {!showInputSection && (
            <h1
              className={styles['center-text']}
              onClick={() => setShowInputSection(!showInputSection)}
              style={{ cursor: 'pointer' }}
            >
              JOIN THE WAITLIST
            </h1>
          )}
          <h1 className={styles['right-text']}>COMING SOON</h1>
        </div>
        <div className={styles['header-line']} />

        {showInputSection && (
          <h1
            className={styles.waitlist}
            onClick={() => setShowInputSection(!showInputSection)}
          >
            JOIN THE WAITLIST
          </h1>
        )}

        {/* Middle section */}
        <div className={styles.middleSection}>
          <h1>
            <span>DISCOVER</span> <br />
            <span>HIDDEN GEMS</span> <br />
            <span>IN YOUR CITY</span>
          </h1>
          {showInputSection && (
            <div className={styles.inputSection}>
              <input type="text" placeholder="NAME" className={styles.input} />
              <input
                type="email"
                placeholder="EMAIL"
                className={styles.input}
              />
              <button className={styles.button}>SUBMIT</button>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className={styles.textSection}>
          <p className={styles['text-section-description']}>
            <span>Discover Restaurants, Book Tables,</span> <br />
            <span>Share Experiences</span> <br />
          </p>
          {/* Add a horizontal line */}
        </div>
        <div className={styles['text-section-line']} />
      </div>

      {/* Horizontal Slider Section */}
      <div ref={sectionBottom} className={styles.sliderSection}>
        <h1 className={styles.sectionTitle}>SECOND COURSE</h1>
        <div className={styles.sliderWrapper}>
          {/* Next Button */}
          <button
            className={`${styles.navButton1} ${
              currentIndex < slides.length - 1 ? '' : styles.disabled1
            }`}
            onClick={() =>
              scrollSlider(1, setCurrentIndex, currentIndex, slides)
            }
            disabled={currentIndex >= slides.length - 1}
          >
            <Image
              className={styles.navIcon}
              src={assetUrl('/images/next.png')}
              alt="Next"
              title="Next"
              width={20}
              height={20}
            />
          </button>

          <div id="horizontalSlider" className={styles.horizontalSlider}>
            {slides.map((slide, index) => (
              <div key={index} className={styles.sliderItem}>
                <Image
                  className={styles.sliderImage}
                  src={slide.img}
                  alt="restaurant"
                  title="Restaurant"
                  width={300}
                  height={230}
                />
                <h3 className={styles.sliderTitle}>{slide.title}</h3>
                <p className={styles.sliderDescription}>{slide.description}</p>
              </div>
            ))}
          </div>

          {/* Back Button */}
          <button
            className={`${styles.navButton} ${
              currentIndex > 0 ? '' : styles.disabled
            }`}
            onClick={() =>
              scrollSlider(-1, setCurrentIndex, currentIndex, slides)
            }
            disabled={currentIndex <= 0}
          >
            <Image
              className={styles.navIcon}
              src={assetUrl('/images/back.png')}
              alt="Back"
              title="Back"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>

      <div ref={sectionFooter} className={styles.footer} style={style}>
        <div className={styles.footerContent}>
          <h2 className={styles.footerItem}>WORK WITH US</h2>
          <h2 className={styles.footerItem}>CEO LINKEDIN</h2>
          <h2 className={styles.footerItem}>PRESS INQUIRIES</h2>
          <h2 className={styles.footerItem}>CONTACT</h2>
          <h2 className={styles.footerItem}>FAQ</h2>
        </div>
        <div className={styles['footer-line']} />
        <div className={styles.footerSection}>
          <Image
            className={styles.logo}
            src={assetUrl('/images/logo.png')}
            alt="Mappetizer"
            title="Mappetizer"
            width={150}
            height={40}
          />
          <SocialMedia />
        </div>
      </div>
    </div>
  );
}
