'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import { assetUrl } from './components/utils';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import SocialMedia from './components/SocialMedia';
import { logError } from './components/utils/logging';
import ShareButtons from './components/ShareButtons/ShareButtons';
import { mergeClassNames } from './components/utils/mergeClassNames';
import { webConfig } from './components/utils/webConfig';
import ReCaptchaV3, {
  requestRecaptchaV3Token,
} from './components/utils/ReCaptchaV3';
import RestoModal from './components/restoModal/RestoModal';

const pressEmail = 'press@mappetizer.com';
const contactEmail = 'hello@mappetizer.com';
const style: React.CSSProperties = {
  backgroundImage: `linear-gradient(rgb(16, 16, 16, 0.2), rgb(16, 16, 16, 0.2)), url('${assetUrl(
    '/images/map-pattern.png',
  )}')`,
};

interface Slide {
  title: string;
  description: JSX.Element | React.ReactNode;
  img: string;
  onClick?: () => unknown;
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

const siteTitle = 'mappetizer';
const siteDescription = 'a restaurant discovery app.';
const getSlides = (
  setShowInputSection: React.Dispatch<React.SetStateAction<boolean>>,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsShareModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
): Slide[] => [
  {
    title: 'SAY HI',
    description: <p>Meet the team behind this ambitious app build.</p>,
    img: '/images/1.png',
    onClick: () => {
      window.location.href = 'https://codereroute.com';
    },
  },
  {
    title: 'THE WAITLIST',
    description: (
      <p>Early birds only. Sign up to be among the first app users.</p>
    ),
    img: '/images/2.png',
    onClick: () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setShowInputSection(true);
    },
  },
  {
    title: 'RESTO ROLL CALL',
    description: <p>We’re requesting feedback from any and all restaurants.</p>,
    img: '/images/3.png',
    onClick: () => {
      setIsModalOpen(true);
    },
  },
  {
    title: 'FOLLOW US',
    description: (
      <div>
        <SocialMedia
          customStyles={{ justifyContent: 'flex-start' }}
          imageStyle={{ filter: 'invert(100%)' }}
          iconContainerStyle={{ backgroundColor: '#000000' }}
        />
      </div>
    ),
    img: '/images/4.png',
  },
  {
    title: 'TELL A FRIEND',
    description: (
      <p>Support our vision by sharing it with your friends far and wide.</p>
    ),
    img: '/images/5.png',
    onClick: () => {
      if (!navigator.share) {
        setIsShareModalOpen(true);
        logError('Web Share API not supported.');
        return;
      }
      try {
        navigator.share({
          title: siteTitle,
          text: siteDescription,
          url: window.location.href,
        });
      } catch (e) {
        setIsShareModalOpen(true);
        logError('Web Share API not supported.', e);
      }
    },
  },
];

export default function Home() {
  const sectionTop = useRef<HTMLDivElement>(null);
  const sectionBottom = useRef<HTMLDivElement>(null);
  const sectionFooter = useRef<HTMLDivElement>(null);
  const [showInputSection, setShowInputSection] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [, setHoveredIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [pressInquiries, setPressInquiries] = useState<boolean>(false);
  const [isContact, setIsContact] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string | undefined>('');
  const [email, setEmail] = useState<string | undefined>('');
  const [resp, setResp] = useState<BaseResponse | null>(null);

  interface BaseResponse {
    success: boolean;
    message?: string;
    error?: string;
  }

  useEffect(() => {
    const formattedName = firstName.split(' ');
    if (formattedName.length === 4) {
      setLastName(formattedName[formattedName.length - 1]);
    } else {
      setLastName(undefined);
    }
  }, [firstName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResp(null);

    await requestRecaptchaV3Token(async (token) => {
      if (!token) {
        alert('reCAPTCHA verification failed. Please try again.');
        return;
      }

      // Use the token directly in the API request
      const response = await fetch(
        `${webConfig.nextPublicBaseUrl}/user-info/create?token=${token}`,
        {
          method: 'POST',
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            types: ['WAITLIST'],
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data = await response.json();
      if (response.ok) {
        setResp({
          success: true,
          message: 'Application submitted successfully!',
        });
      } else {
        setResp({
          success: false,
          error: data.message || 'Something went wrong. Please try again.',
        });
      }
    });
  };

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

  const slides = useMemo(
    () => getSlides(setShowInputSection, setIsModalOpen, setIsShareModalOpen),
    [],
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div>
      <ReCaptchaV3 />
      <div ref={sectionTop} className={styles.hero}>
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.videoBackground}
        >
          <source src={assetUrl('/video.mp4')} type="video/mp4" />
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
            style={{ cursor: 'pointer' }}
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
            <>
              <div
                className={mergeClassNames(
                  styles.inputSection,
                  styles.topInputContainer,
                )}
              >
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  type="text"
                  placeholder="NAME"
                  className={styles.input}
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="EMAIL"
                  className={styles.input}
                />
                <button
                  onClick={handleSubmit}
                  className={`${styles.button} ${
                    resp?.success ? styles.success : ''
                  }`}
                >
                  {resp && resp.success
                    ? 'SUBMITTED'
                    : resp?.error === 'Email address already exists'
                    ? 'SUBMITTED'
                    : 'SUBMIT'}
                </button>
              </div>
              {resp && (
                <div>
                  <p
                    style={{
                      color: resp.success ? '#d0f29b' : 'red',
                      fontWeight: '700',
                      fontSize: '16px',
                      textAlign: 'center',
                    }}
                  >
                    {resp.success ? resp.message : resp.error}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div>
        <div className={styles.textSection}>
          <div>
            <p className={styles['text-section-description']}>
              <span>Discover restaurants. Book tables.</span> <br />
              <span>Share experiences.</span> <br />
            </p>
            <p className={styles['text-section-sub']}>
              <p>
                We’re building a platform to connect restaurants directly with
                customers (users). Our platform offers a niche social media
                experience for users with ‘action buttons’ for personalized
                restaurant discoverability, direct reservations, quick planning
                between friends, trustworthy reviews + more.
              </p>
              <p>
                We believe the secret sauce is in creating an app that caters to
                both restaurants and customers— while serving up cool app
                features that make dining experiences fun.
              </p>
            </p>
          </div>
        </div>
        <div className={styles['text-section-line']} />
      </div>

      {/* Horizontal Slider Section */}
      <div ref={sectionBottom} className={styles.sliderSection}>
        <h1 className={styles.sectionTitle}>WHILE YOU WAIT</h1>
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
                <RestoModal
                  closeModal={closeModal}
                  className={styles.modalContent}
                />
              </div>
            )}

            {isShareModalOpen && (
              <div
                className={styles.modalOverlay}
                role="dialog"
                aria-labelledby="modal-title"
              >
                <div className={styles.modalContent}>
                  <div className={styles.inputSection}>
                    <ShareButtons
                      handleClose={() => setIsShareModalOpen(false)}
                    />
                  </div>
                </div>
              </div>
            )}
            {!isMobile &&
              slides.map((slide, index) => (
                <div
                  key={index}
                  className={styles.sliderItem}
                  onClick={slide.onClick}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Image
                    className={styles.sliderImage}
                    src={assetUrl(slide.img)}
                    alt=""
                    title=""
                    width={300}
                    height={230}
                  />
                  <h3 className={styles.sliderTitle}>{slide.title}</h3>
                  <div className={styles.sliderDescription}>
                    {slide.description}
                  </div>
                </div>
              ))}

            {isMobile &&
              slides.map((slide, index) => (
                <div
                  key={index}
                  className={styles.sliderItem}
                  onClick={slide.onClick}
                >
                  <Image
                    className={styles.sliderImage}
                    src={assetUrl(slide.img)}
                    alt=""
                    title=""
                    width={300}
                    height={230}
                  />
                  <h3 className={styles.sliderTitle}>{slide.title}</h3>
                  <div className={styles.sliderDescription}>
                    {slide.description}
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
              <a
                className={styles['footer-item-link']}
                href="https://codereroute.com/"
                target="_blank"
              >
                <h2
                  className={mergeClassNames(
                    styles.footerItem,
                    styles['footer-button'],
                  )}
                >
                  WORK WITH US
                </h2>
              </a>
              <a
                target="_blank"
                className={styles['footer-item-link']}
                href={'https://www.linkedin.com/in/danielle-dufour'}
                rel="noopener noreferrer"
              >
                <h2
                  className={mergeClassNames(
                    styles.footerItem,
                    styles['footer-button'],
                  )}
                >
                  CEO LINKEDIN
                </h2>
              </a>
              <a
                target="_blank"
                className={styles['footer-item-link']}
                href={`mailto:${pressEmail}`}
                onClick={() => setPressInquiries(true)}
              >
                <h2
                  className={mergeClassNames(
                    styles.footerItem,
                    styles['footer-button'],
                  )}
                >
                  {pressInquiries ? 'PRESS@MAPPETIZER.COM' : 'PRESS INQUIRIES'}
                </h2>
              </a>
              <a
                target="_blank"
                className={styles['footer-item-link']}
                href={`mailto:${contactEmail}`}
                onClick={() => setIsContact(true)}
              >
                <h2
                  className={mergeClassNames(
                    styles.footerItem,
                    styles['footer-button'],
                  )}
                >
                  {isContact ? 'HELLO@MAPPETIZER.COM' : 'CONTACT'}
                </h2>
              </a>
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
              <div>
                <SocialMedia className="custom-class" />
              </div>
            </div>
          </>
        )}
        {isMobile && (
          <>
            <div className={styles.footerButtonContainer}>
              <a target="_blank" href="https://codereroute.com/">
                <button className={styles.footerButton}>WORK HERE</button>
              </a>
              <a
                target="_blank"
                href={'https://www.linkedin.com/in/danielle-dufour'}
                rel="noopener noreferrer"
              >
                <button className={styles.footerButton}>CEO LINKEDIN</button>
              </a>
              <a href={`mailto:${pressEmail}`}>
                <button
                  onClick={() => setPressInquiries(true)}
                  className={styles.footerButton}
                >
                  {pressInquiries ? 'PRESS@MAPPETIZER.COM' : 'PRESS INQUIRIES'}
                </button>
              </a>

              {/* CONTACT */}
              <a href={`mailto:${contactEmail}`}>
                <button
                  onClick={() => setIsContact(true)}
                  className={styles.footerButton}
                >
                  {isContact ? 'HELLO@MAPPETIZER.COM' : 'CONTACT'}
                </button>
              </a>
            </div>
            <div className={styles.socialMediaContainer}>
              <SocialMedia className="custom-class" />
            </div>
            {/* <div className={styles.footerLogo}>
              <Image
                className={styles.logo}
                src={assetUrl('/images/logoIcon.png')}
                alt="Mappetizer"
                title="Mappetizer"
                width={30}
                height={30}
              />
            </div> */}
          </>
        )}
      </div>
    </div>
  );
}
