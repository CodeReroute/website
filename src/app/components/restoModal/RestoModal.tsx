import React from 'react';
import { mergeClassNames } from '../utils/mergeClassNames';
import styles from './RestoModal.module.scss';
import CloseIcon from './CloseIcon';

interface RestoModalProps {
  className?: string;
  closeModal: () => unknown;
}

const RestoModal: React.FC<RestoModalProps> = ({ closeModal, className }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className={styles.closeIconContainer}>
        <CloseIcon onClick={closeModal} />
      </div>
      <div className={styles.modalTitle}>
        By filling out the information on this form, you are helping us build
        powerful tech for restaurants everywhere. Thank you for your role in
        shaping this project.
      </div>
      {/* Row 1 */}
      <div className={styles.inputRow}>
        <div className={styles.inputSection}>
          <input
            type="text"
            placeholder="Name *"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputSection}>
          <input
            type="text"
            placeholder="Restaurant name *"
            className={styles.input}
            required
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className={styles.inputRow}>
        <div className={styles.inputSection}>
          <input
            type="text"
            placeholder="Location *"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputSection}>
          <input
            type="email"
            placeholder="Email *"
            className={styles.input}
            required
          />
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
          <input type="text" className={styles.input} />
        </div>

        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            What tools or platforms does your restaurant you use to manage
            reservations?
          </label>
          <input type="text" className={styles.input} />
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
          <input type="text" className={styles.input} />
        </div>

        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            What challenges does your restaurant face for maintaining a
            consistent flow of customers?
          </label>
          <input type="text" className={styles.input} />
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
          <input type="text" className={styles.input} />
        </div>

        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            Do you work with a marketing agency?
          </label>
          <input type="text" className={styles.input} />
        </div>
        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            If you were to spend $1,000 on marketing, how would you determine
            whether it was effective?
          </label>
          <input type="text" className={styles.input} />
        </div>
        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            How much are you currently spending on software per month?
          </label>
          <input type="text" className={styles.input} />
        </div>
        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            Do you work with influencers or local food bloggers?
          </label>
          <input type="text" className={styles.input} />
        </div>
        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            Would you like it if negative reviews were not made public?
          </label>
          <input type="text" className={styles.input} />
        </div>
        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            If you could design the perfect tool to help run your restaurant,
            what features would it have?
          </label>
          <input type="text" className={styles.input} />
        </div>
      </div>

      {/* Buttons */}
      <div className={styles.buttonSection}>
        {/* <button onClick={closeModal} className={styles.button}>
          Cancel
        </button> */}
        <button className={styles.button} type="submit">
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default RestoModal;
