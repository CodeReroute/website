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

        {/* Middle section */}
        <div className={styles.middleSection}>
          <SocialMedia className="custom-class" />
          <Image
            className={styles.logo}
            src={assetUrl('/images/logo.png')}
            alt="Mappetizer"
            title="Mappetizer"
            // placeholder="blur"
            // blurDataURL={assetUrl('/images/logo_optimized.png')}
            width={180}
            height={24}
          />
          <p className={styles.comingSoon}>COMING SOON</p>
        </div>
      </div>
    </div>
  );
}
