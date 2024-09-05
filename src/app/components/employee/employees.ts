import { assetUrl } from '../utils';

export interface EmployeeDetails {
  name: string;
  title: string;
  subTitle?: string;
  pictureUrl: string;
}

export const employees: EmployeeDetails[] = [
  {
    name: 'Haseeb Khalid',
    title: 'Jr. UI Designer',
    pictureUrl: assetUrl('/images/haseeb.png'),
  },
  {
    name: 'Danielle Dufour',
    title: 'Business Development',
    subTitle: 'Founder',
    pictureUrl: assetUrl('/images/danielle.png'),
  },
  {
    name: 'Hafiz Temuri',
    title: 'Sr. Software Engineer',
    pictureUrl: assetUrl('/images/hafiz.png'),
  },
  {
    name: 'Usman Ahmed',
    title: 'Jr. Software Engineer',
    pictureUrl: assetUrl('/images/usman.png'),
  },
  {
    name: 'Ahmed Ashfaq',
    title: 'Jr. Software Engineer',
    pictureUrl: assetUrl('/images/ahmed.png'),
  },
  {
    name: 'Bilal Siddique',
    title: 'Jr. Software Engineer',
    pictureUrl: assetUrl('/images/bilal.png'),
  },
];
