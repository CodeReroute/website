import React from 'react';
import styles from './Timeline.module.scss';
import { mergeClassNames } from '../utils/mergeClassNames';

export interface TimelinePhase {
  id: string;
  title: string;
  description: string | JSX.Element | undefined;
  above: boolean;
  width: number;
  left?: string;
  addIcon?: boolean;
}

interface TimelineProps {
  phases: TimelinePhase[];
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ phases, className }) => {
  return (
    <div className={mergeClassNames(className, styles['timeline'])}>
      <div className={styles['line']} />
      <div className={styles['timeline-wrapper']}>
        {phases.map((p) => (
          <div key={p.id} id={p.id} className={styles['dot-wrapper']}>
            <div
              style={{ width: p.width, left: p.left }}
              className={
                p.above
                  ? mergeClassNames(styles['text'], styles['above'])
                  : mergeClassNames(styles['text'], styles['below'])
              }
            >
              <h6 className={styles['bold']}>{p.title}</h6>
              {p.description && <h6>{p.description}</h6>}
              {p.addIcon && <h6 className={styles['bold']}>WE ARE HERE</h6>}
            </div>
            {p.addIcon && (
              <div
                className={
                  p.above
                    ? mergeClassNames(
                        styles['arrow-icon'],
                        styles['icon-above'],
                      )
                    : mergeClassNames(
                        styles['arrow-icon'],
                        styles['icon-below'],
                      )
                }
              />
            )}
            <div className={styles['dot']} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
