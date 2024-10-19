import React from 'react';
import styles from './page.module.scss';

// const phases: TimelinePhase[] = [
//   {
//     id: '1',
//     title: 'September',
//     above: true,
//     description: undefined,
//     width: 100,
//   },
//   {
//     id: '2',
//     title: 'October',
//     above: false,
//     description: undefined,
//     width: 100,
//   },
//   {
//     id: '3',
//     title: 'November',
//     above: true,
//     description: undefined,
//     width: 100,
//   },
//   {
//     id: '4',
//     title: 'December',
//     above: false,
//     width: 100,
//     description: undefined,
//   },
//   {
//     id: '5',
//     title: 'January',
//     above: true,
//     description: undefined,
//     width: 100,
//   },
// ];

const TimelineArea: React.FC = () => {
  return (
    <div className={styles['timeline']}>
      {/* <div className={styles['website-timeline-wrapper']}>
        <div className={styles['website-timeline']}>
          <Timeline phases={phases} />
        </div>
      </div> */}
      <div className={styles['timeline-text-wrapper']}>
        <p className={styles['timeline-light']}>
          SO, LET'S CHAT ABOUT THE TIMELINE
        </p>
        <p className={styles['timeline-point-1']}>
          Our projected countdown to launch is <strong>6-8 months</strong>.
          We're a small team working hard behind the scenes to meet this
          deadline.
        </p>
        <p className={styles['timeline-point-2']}>
          Fingers crossed 🤞🏼 that you'll still be interested in being a crucial
          part of out app dev.
        </p>
      </div>
    </div>
  );
};

export default TimelineArea;
