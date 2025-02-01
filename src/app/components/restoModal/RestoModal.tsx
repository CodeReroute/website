import React from 'react';
import { mergeClassNames } from '../utils/mergeClassNames';
import styles from './RestoModal.module.scss';
import CloseIcon from './CloseIcon';

interface RestoModalProps {
  className?: string;
  closeModal: () => unknown;
}

const RestoModal: React.FC<RestoModalProps> = ({ closeModal, className }) => {
  return (
    <div className={className}>
      <div className={styles.closeIconContainer}>
        <CloseIcon onClick={closeModal} />
      </div>
      {/* Row 1 */}
      <div className={styles.inputRow}>
        <div className={styles.inputSection}>
          <input
            type="text"
            placeholder="Enter your name"
            className={styles.input}
          />
        </div>

        <div className={styles.inputSection}>
          <input
            type="text"
            placeholder="Restaurant Name"
            className={styles.input}
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className={styles.inputRow}>
        <div className={styles.inputSection}>
          <input type="text" placeholder="Location" className={styles.input} />
        </div>

        <div className={styles.inputSection}>
          <input
            type="text"
            placeholder="Cuisine type"
            className={styles.input}
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
            How do you currently attract new customers to your restaurant?
          </label>
          <input type="text" className={styles.input} />
        </div>

        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            Do you have any strategies to encourage repeat customers or build
            loyality?
          </label>
          <input type="text" className={styles.input} />
        </div>
      </div>

      <div className={styles.inputFullRow}>
        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            What do you think is the most important factor in retaining
            customers?
          </label>
          <input type="text" className={styles.input} />
        </div>

        <div
          className={mergeClassNames(styles.inputSection, styles.fullRowInput)}
        >
          <label className={styles.inputLabel}>
            Where do your customers typically hear about your restaurant?
          </label>
          <input type="text" className={styles.input} />
        </div>
      </div>

      {/* Buttons */}
      <div className={styles.buttonSection}>
        <button onClick={closeModal} className={styles.button}>
          Cancel
        </button>
        <button className={styles.button}>Submit</button>
      </div>
    </div>
  );
};

export default RestoModal;
