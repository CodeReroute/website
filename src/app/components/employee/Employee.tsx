import React from 'react';
import Image from 'next/image';
import styles from './Employee.module.scss';
import { EmployeeDetails } from './employees';

interface EmployeeProps extends EmployeeDetails {}

const Employee: React.FC<EmployeeProps> = ({
  name,
  title,
  subTitle,
  pictureUrl,
}) => {
  return (
    <div className={styles.employee}>
      <Image
        className={styles.logo}
        src={pictureUrl}
        alt={name}
        width={165}
        height={165}
      />
      <div className={styles['employee-info']}>
        <div className={styles['employee-title']}>{name}</div>
        <div>{title}</div>
        {subTitle && <div>{subTitle}</div>}
      </div>
    </div>
  );
};

export default Employee;
