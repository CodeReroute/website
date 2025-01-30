'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import { assetUrl } from './components/utils';
import React, { useEffect, useRef, useState } from 'react';
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

const scrollSlider = (
  direction: number,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
  currentIndex: number,
  slides: Slide[],
) => {
  const slider = document.getElementById('horizontalSlider');
  if (slider) {
    const scrollAmount = 300;
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
    description: (
      <div>
        <SocialMedia
          instagramUrl="https://www.instagram.com/_mappetizer"
          instagramIcon={assetUrl("/images/social-media/instagram.png")}
          tiktokUrl="https://www.tiktok.com/@mappetizer"
          tiktokIcon={assetUrl("/images/social-media/tiktok.png")}
          linkedinUrl="https://www.linkedin.com/company/mappetizer/about"
          linkedinIcon={assetUrl("/images/social-media/linkedin.png")}
          className="custom-class"
          customStyles={{ justifyContent: 'flex-start' }}
        />
      </div>
    ),
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
  const [showInputSection, setShowInputSection] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredFooter, setHoveredFooter] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pressInquiries, setPressInquiries] = useState<boolean>(false);
  const [isContact, setIsContact] = useState<boolean>(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 560);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
          <source src={assetUrl("/video.mp4")} type="video/mp4" />
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
          {isMobile && !showInputSection && (
            <button
              onClick={() => setShowInputSection(!showInputSection)}
              className={styles.waitlistButton}
            >
              JOIN THE WAITLIST
            </button>
          )}
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
            <span>Discover restaurants. Book tables.</span> <br />
            <span>Share experiences.</span> <br />
          </p>
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
            {isModalOpen && (
              <div
                className={styles.modalOverlay}
                role="dialog"
                aria-labelledby="modal-title"
              >
                <div className={styles.modalContent}>
                  <div className={styles.inputSection}>
                    <input
                      type="text"
                      placeholder="Your Preferred Role"
                      className={styles.input}
                    />
                    <input
                      type="text"
                      placeholder="Your Email"
                      className={styles.input}
                    />
                    <input
                      type="text"
                      placeholder="First Name"
                      className={styles.input}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className={styles.input}
                    />
                    <input
                      type="text"
                      placeholder="Pronouns"
                      className={styles.input}
                    />
                    <input
                      type="text"
                      placeholder="Your City"
                      className={styles.input}
                    />
                    <input
                      type="text"
                      placeholder="Why do you want to work with us?"
                      className={styles.input}
                    />
                    <input
                      type="text"
                      placeholder="How did you hear about us?"
                      className={styles.input}
                    />
                    <button className={styles.input}>
                      Attach your portfolio
                    </button>
                    <div className={styles.buttonSection}>
                      <button className={styles.button}>Submit</button>
                      <button onClick={closeModal} className={styles.button}>
                        Cancel
                      </button>
                    </div>
                    <h3 className={styles.modalText}>
                      If a role becomes available in your preferred category and
                      if we think you might be a good fit, we will reach out via
                      email.
                    </h3>
                  </div>
                </div>
              </div>
            )}
            {!isMobile &&
              slides.map((slide, index) => (
                <div
                  key={index}
                  className={styles.sliderItem}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Image
                    className={styles.sliderImage}
                    src={assetUrl(slide.img)}
                    alt="restaurant"
                    title="Restaurant"
                    width={300}
                    height={230}
                  />
                  {slide.title === 'FOLLOW US' || hoveredIndex !== index ? (
                    <h3 className={styles.sliderTitle}>{slide.title}</h3>
                  ) : slide.title === 'SAY HI' ? (
                    <div>
                      <button
                        className={`${styles.sliderTitle} ${styles.titleButton}`}
                        onClick={() => {
                          window.location.href = 'https://codereroute.com';
                        }}
                      >
                        {slide.title}
                      </button>
                    </div>
                  ) : slide.title === 'THE WAITLIST' ? (
                    <div>
                      <button
                        className={`${styles.sliderTitle} ${styles.titleButton}`}
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        {slide.title}
                      </button>
                    </div>
                  ) : slide.title === 'RESTO ROLL CALL' ? (
                    <div>
                      <button
                        className={`${styles.sliderTitle} ${styles.titleButton}`}
                        onClick={() => {
                          setIsModalOpen(true);
                        }}
                      >
                        {slide.title}
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        className={`${styles.sliderTitle} ${styles.titleButton}`}
                      >
                        {slide.title}
                      </button>
                    </div>
                  )}
                  <div className={styles.sliderDescription}>
                    {typeof slide.description === 'string' ? (
                      <p>{slide.description}</p>
                    ) : (
                      slide.description
                    )}
                  </div>
                </div>
              ))}

            {isMobile &&
              slides.map((slide, index) => (
                <div
                  key={index}
                  className={styles.sliderItem}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Image
                    className={styles.sliderImage}
                    src={assetUrl(slide.img)}
                    alt="restaurant"
                    title="Restaurant"
                    width={300}
                    height={230}
                  />
                  {slide.title === 'FOLLOW US' ? (
                    <h3 className={styles.sliderTitle}>{slide.title}</h3>
                  ) : slide.title === 'SAY HI' ? (
                    <div>
                      <button
                        className={styles.titleButton}
                        onClick={() => {
                          window.location.href = 'https://codereroute.com';
                        }}
                      >
                        {slide.title}
                      </button>
                    </div>
                  ) : slide.title === 'THE WAITLIST' ? (
                    <div>
                      <button
                        className={styles.titleButton}
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        {slide.title}
                      </button>
                    </div>
                  ) : slide.title === 'RESTO ROLL CALL' ? (
                    <div>
                      <button
                        className={styles.titleButton}
                        onClick={() => {
                          setIsModalOpen(true);
                        }}
                      >
                        {slide.title}
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        className={styles.titleButton}
                        onClick={() => {
                          setIsModalOpen(true);
                        }}
                      >
                        {slide.title}
                      </button>
                    </div>
                  )}
                  <div className={styles.sliderDescription}>
                    {typeof slide.description === 'string' ? (
                      <p>{slide.description}</p>
                    ) : (
                      slide.description
                    )}
                  </div>
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
        {!isMobile && (
          <>
            <div className={styles.footerContent}>
              <div
                className={styles.footerItemWrapper}
                onMouseEnter={() => setHoveredFooter('WORK WITH US')}
                onMouseLeave={() => setHoveredFooter(null)}
              >
                {hoveredFooter === 'WORK WITH US' ? (
                  <a
                    target="_blank"
                    href={'https://codereroute.com/'}
                    rel="noopener noreferrer"
                  >
                    <button
                      className={`${styles.footerItem} ${styles.footerButton}`}
                    >
                      WORK WITH US
                    </button>
                  </a>
                ) : (
                  <h2 className={styles.footerItem}>WORK WITH US</h2>
                )}
              </div>

              <div
                className={styles.footerItemWrapper}
                onMouseEnter={() => setHoveredFooter('CEO LINKEDIN')}
                onMouseLeave={() => setHoveredFooter(null)}
              >
                {hoveredFooter === 'CEO LINKEDIN' ? (
                  <a
                    target="_blank"
                    href={
                      'https://www.linkedin.com/in/danielle-dufour?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
                    }
                    rel="noopener noreferrer"
                  >
                    <button
                      className={`${styles.footerItem} ${styles.footerButton}`}
                    >
                      CEO LINKEDIN
                    </button>
                  </a>
                ) : (
                  <h2 className={styles.footerItem}>CEO LINKEDIN</h2>
                )}
              </div>

              {!pressInquiries && (
                <div
                  className={styles.footerItemWrapper}
                  onMouseEnter={() => setHoveredFooter('PRESS INQUIRIES')}
                  onMouseLeave={() => setHoveredFooter(null)}
                >
                  {hoveredFooter === 'PRESS INQUIRIES' ? (
                    <button
                      className={`${styles.footerItem} ${styles.footerButton}`}
                      onClick={() => setPressInquiries(!pressInquiries)}
                    >
                      PRESS INQUIRIES
                    </button>
                  ) : (
                    <h2 className={styles.footerItem}>PRESS INQUIRIES</h2>
                  )}
                </div>
              )}

              {pressInquiries && (
                <div className={styles.emailContainer}>
                  <a href="mailto:hello@mappetizer.com">press@mappetizer.com</a>
                </div>
              )}

              {!isContact && (
                <div
                  className={styles.footerItemWrapper}
                  onMouseEnter={() => setHoveredFooter('CONTACT')}
                  onMouseLeave={() => setHoveredFooter(null)}
                >
                  {hoveredFooter === 'CONTACT' ? (
                    <button
                      className={`${styles.footerItem} ${styles.footerButton}`}
                      onClick={() => setIsContact(!isContact)}
                    >
                      CONTACT
                    </button>
                  ) : (
                    <h2 className={styles.footerItem}>CONTACT</h2>
                  )}
                </div>
              )}

              {isContact && (
                <div className={styles.emailContainer}>
                  <a href="mailto:hello@mappetizer.com">
                    contact@mappetizer.com
                  </a>
                </div>
              )}
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
              {pressInquiries && (
                <div className={styles.footerItemWrapper}>
                  <button
                    className={`${styles.footerItem} ${styles.footerButton}`}
                    onClick={() => {
                      setPressInquiries(!pressInquiries);
                      setHoveredFooter(null);
                    }}
                  >
                    PRESS INQUIRIES
                  </button>
                </div>
              )}
              {isContact && (
                <div className={styles.footerItemWrapper}>
                  <button
                    className={`${styles.footerItem} ${styles.footerButton}`}
                    onClick={() => {
                      setIsContact(!isContact);
                      setHoveredFooter(null);
                    }}
                  >
                    CONTACT
                  </button>
                </div>
              )}
              <div>
                <SocialMedia
                  instagramUrl="https://www.instagram.com/_mappetizer"
                  instagramIcon={assetUrl('/images/social-media/instagram.png')}
                  tiktokUrl="https://www.tiktok.com/@mappetizer"
                  tiktokIcon={assetUrl('/images/social-media/tiktok.png')}
                  linkedinUrl="https://www.linkedin.com/company/mappetizer/about"
                  linkedinIcon={assetUrl('/images/social-media/linkedin.png')}
                  className="custom-class"
                />
              </div>
            </div>
          </>
        )}
        {isMobile && (
          <>
            <div className={styles.socialMediaContainer}>
              <SocialMedia
                instagramUrl="https://www.instagram.com/_mappetizer"
                instagramIcon={assetUrl("/images/social-media/instagram.png")}
                tiktokUrl="https://www.tiktok.com/@mappetizer"
                tiktokIcon={assetUrl("/images/social-media/tiktok.png")}
                linkedinUrl="https://www.linkedin.com/company/mappetizer/about"
                linkedinIcon={assetUrl("/images/social-media/linkedin.png")}
                className="custom-class"
              />
            </div>
            <div className={styles.footerButtonContainer}>
              <button className={styles.footerButton}>WORK HERE</button>
              <button className={styles.footerButton}>CEO LINKEDIN</button>
              <button className={styles.footerButton}>PRESS INQUIRIES</button>
              <button className={styles.footerButton}>CONTACT</button>
            </div>
            <div className={styles.footerLogo}>
              <Image
                className={styles.logo}
                src={assetUrl('/images/logoIcon.png')}
                alt="Mappetizer"
                title="Mappetizer"
                width={30}
                height={30}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
