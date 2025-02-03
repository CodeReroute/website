import React, { useEffect, useRef, useState } from 'react';
import { mergeClassNames } from '../utils/mergeClassNames';
import styles from './RestoModal.module.scss';
import CloseIcon from './CloseIcon';
import { webConfig } from '../utils/webConfig';
import ReCaptchaV3, { requestRecaptchaV3Token } from '../utils/ReCaptchaV3';

interface BaseResponse {
  success: boolean;
  message?: string;
  error?: string;
}

interface RestoModalProps {
  className?: string;
  closeModal: () => unknown;
}

const RestoModal: React.FC<RestoModalProps> = ({ closeModal, className }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string | undefined>('');
  const [email, setEmail] = useState<string | undefined>('');
  const [location, setLocation] = useState<string | undefined>('');
  const [restaurantName, setRestaurantName] = useState<string | undefined>('');
  const [marketingTools, setMarketingTools] = useState<string | undefined>('');
  const [reservationTools, setReservationTools] = useState<string | undefined>(
    '',
  );
  const [customerSource, setCustomerSource] = useState<string | undefined>('');
  const [challenges, setChallenges] = useState<string | undefined>('');
  const [frustrations, setFrustrations] = useState<string | undefined>('');
  const [hasMarketingAgency, setHasMarketingAgency] = useState<
    string | undefined
  >('');
  const [marketingBudgetMetrics, setMarketingBudgetMetrics] = useState<
    string | undefined
  >('');
  const [softwareSpend, setSoftwareSpend] = useState<string | undefined>('');
  const [hasInfluencers, setHasInfluencers] = useState<string | undefined>('');
  const [hideNegativeReviews, setHideNegativeReviews] = useState<
    string | undefined
  >('');
  const [desiredFeatures, setDesiredFeatures] = useState<string | undefined>(
    '',
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [resp, setResp] = useState<BaseResponse | null>(null);

  useEffect(() => {
    const formattedName = firstName.trim().split(' ');

    if (formattedName.length > 2) {
      setFirstName(formattedName.slice(0, -1).join(' '));
      setLastName(formattedName[formattedName.length - 1]);
    } else {
      setLastName(undefined);
    }
  }, [firstName]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!firstName) newErrors.firstName = 'Name field is required';
    if (!restaurantName)
      newErrors.restaurantName = 'Restaurant name is required';
    if (!location) newErrors.location = 'Location is required';
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
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
      setResp(null);
      return;
    }

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
            types: ['RESTAURANT'],
            feedback: {
              location: location,
              restaurantName: restaurantName,
              marketingTools: marketingTools,
              reservationTools: reservationTools,
              customerSource: customerSource,
              challenges: challenges,
              frustrations: frustrations,
              hasMarketingAgency: hasMarketingAgency,
              marketingBudgetMetrics: marketingBudgetMetrics,
              softwareSpend: softwareSpend,
              hasInfluencers: hasInfluencers,
              hideNegativeReviews: hideNegativeReviews,
              desiredFeatures: desiredFeatures,
            },
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

  return (
    <form ref={formRef} className={className} onSubmit={handleSubmit}>
      <ReCaptchaV3 />
      <div className={styles.closeIconContainer}>
        <CloseIcon onClick={closeModal} />
      </div>
      <div className={styles.modalTitle}>
        By filling out the information on this form, you are helping us build
        powerful tech for restaurants everywhere. Thank you.
      </div>
      {/* Row 1 */}
      <div className={styles.inputRow}>
        <div className={styles.inputSection}>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="Name *"
            className={styles.input}
            required
          />
          {errors.firstName && (
            <p className={styles.error}>{errors.firstName}</p>
          )}
        </div>

        <div className={styles.inputSection}>
          <input
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            type="text"
            placeholder="Restaurant name *"
            className={styles.input}
            required
          />
          {errors.restaurantName && (
            <p className={styles.error}>{errors.restaurantName}</p>
          )}
        </div>
      </div>

      {/* Row 2 */}
      <div className={styles.inputRow}>
        <div className={styles.inputSection}>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            placeholder="Location *"
            className={styles.input}
            required
          />
          {errors.location && <p className={styles.error}>{errors.location}</p>}
        </div>

        <div className={styles.inputSection}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email *"
            className={styles.input}
            required
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
      </div>

      {/* Row 3 */}
      <div className={styles.inputFullRow}>
        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            What tools or platforms does your restaurant you use to manage
            marketing?
          </label>
          <input
            type="text"
            className={styles.input}
            value={marketingTools}
            onChange={(e) => setMarketingTools(e.target.value)}
          />
        </div>

        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            What tools or platforms does your restaurant you use to manage
            reservations?
          </label>
          <input
            type="text"
            className={styles.input}
            value={reservationTools}
            onChange={(e) => setReservationTools(e.target.value)}
          />
        </div>
      </div>

      {/* Row 4 */}
      <div className={styles.inputFullRow}>
        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            Where do customers typically hear about your restaurant?
          </label>
          <input
            type="text"
            className={styles.input}
            value={customerSource}
            onChange={(e) => setCustomerSource(e.target.value)}
          />
        </div>

        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            What challenges does your restaurant face for maintaining a
            consistent flow of customers?
          </label>
          <input
            type="text"
            className={styles.input}
            value={challenges}
            onChange={(e) => setChallenges(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.inputFullRow}>
        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            What frustrates you the most about your current customer engagement
            or marketing efforts?
          </label>
          <input
            type="text"
            className={styles.input}
            value={frustrations}
            onChange={(e) => setFrustrations(e.target.value)}
          />
        </div>

        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            Do you work with a marketing agency?
          </label>
          <input
            type="text"
            className={styles.input}
            value={hasMarketingAgency}
            onChange={(e) => setHasMarketingAgency(e.target.value)}
          />
        </div>
        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            If you were to spend $1,000 on marketing, how would you determine
            whether it was effective?
          </label>
          <input
            type="text"
            className={styles.input}
            value={marketingBudgetMetrics}
            onChange={(e) => setMarketingBudgetMetrics(e.target.value)}
          />
        </div>
        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            How much are you currently spending on software per month?
          </label>
          <input
            type="text"
            className={styles.input}
            value={softwareSpend}
            onChange={(e) => setSoftwareSpend(e.target.value)}
          />
        </div>
        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            Do you work with influencers or local food bloggers?
          </label>
          <input
            type="text"
            className={styles.input}
            value={hasInfluencers}
            onChange={(e) => setHasInfluencers(e.target.value)}
          />
        </div>
        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            Would you like it if negative reviews were not made public?
          </label>
          <input
            type="text"
            className={styles.input}
            value={hideNegativeReviews}
            onChange={(e) => setHideNegativeReviews(e.target.value)}
          />
        </div>
        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            If you could design the perfect tool to help run your restaurant,
            what features would it have?
          </label>
          <input
            type="text"
            className={styles.input}
            value={desiredFeatures}
            onChange={(e) => setDesiredFeatures(e.target.value)}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className={styles.buttonSection}>
        <button
          onClick={closeModal}
          className={mergeClassNames(styles.button, styles.cancelButton)}
        >
          CANCEL
        </button>
        <button
          onClick={handleSubmit}
          className={`${styles.button} ${resp?.success ? styles.success : ''}`}
        >
          {resp && resp.success ? 'SUBMITTED' : 'SUBMIT'}
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
    </form>
  );
};

export default RestoModal;
