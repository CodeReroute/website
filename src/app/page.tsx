'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import { assetUrl } from './components/utils';
import React, { useEffect, useRef, useState } from 'react';
import SocialMedia from './components/SocialMedia';
import { mergeClassNames } from './components/utils/mergeClassNames';
import { webConfig } from './components/utils/webConfig';
import ReCaptchaV3, {
  requestRecaptchaV3Token,
} from './components/utils/ReCaptchaV3';
import { formatName } from './components/utils/formatName';

const pressEmail = 'press@mappetizer.com';
const contactEmail = 'hello@mappetizer.com';
const style: React.CSSProperties = {
  backgroundImage: `linear-gradient(rgb(16, 16, 16, 0.5), rgb(16, 16, 16, 0.5)), url('${assetUrl(
    '/images/map-pattern.png',
  )}')`,
};

export default function Home() {
  const sectionTop = useRef<HTMLDivElement>(null);
  const sectionFooter = useRef<HTMLDivElement>(null);
  const [showInputSection, setShowInputSection] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [pressInquiries, setPressInquiries] = useState<boolean>(false);
  const [isContact, setIsContact] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string | undefined>('');
  const [email, setEmail] = useState<string | undefined>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [resp, setResp] = useState<BaseResponse | null>(null);

  interface BaseResponse {
    success: boolean;
    message?: string;
    error?: string;
  }

  useEffect(() => {
    const { firstName: formattedFirstName, lastName: formattedLastName } =
      formatName(firstName);

    setFirstName(formattedFirstName);
    setLastName(formattedLastName);
  }, [firstName]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!firstName) newErrors.firstName = 'Name field is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setResp(null);
      return;
    }

    await requestRecaptchaV3Token(async (token) => {
      if (!token) {
        alert('reCAPTCHA verification failed. Please try again.');
        return;
      }

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
          <source src={assetUrl('/video.webm')} type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Content on Top of the Video */}
        <div className={styles.header}>
          <Image
            className={styles.logo}
            src={assetUrl('/images/logo.png')}
            alt="Mappetizer"
            title="Mappetizer"
            placeholder="blur"
            blurDataURL={assetUrl('/images/logo_optimized.png')}
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
                <div>
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    type="text"
                    placeholder="NAME"
                    className={styles.input}
                  />
                  {errors.firstName && (
                    <p className={styles.error}>{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="EMAIL"
                    className={styles.input}
                  />
                  {errors.email && (
                    <p className={styles.error}>{errors.email}</p>
                  )}
                </div>
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
                    {resp.success ? '' : resp.error}
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
                customers (users). Our platform offers a reimagined social media
                experience for users with ‘action buttons’ for personalized
                restaurant discoverability, direct reservations, quick planning
                between friends, trustworthy reviews + more.
              </p>
              <p className="mb-0">
                We believe the secret sauce is in creating an app that caters to
                both restaurants and customers— while serving up cool app
                features that make dining experiences fun.
              </p>
            </p>
          </div>
        </div>
        <div className={styles['text-section-line']} />
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
                placeholder="blur"
                blurDataURL={assetUrl('/images/logo_optimized.png')}
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
