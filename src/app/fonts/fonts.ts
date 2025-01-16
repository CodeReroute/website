import localFont from 'next/font/local';


export const goga = localFont({
  src: [
    {
      path: './goga/Goga-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './goga/Goga-Extrabold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './goga/Goga-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './goga/Goga-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './goga/Goga-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './goga/Goga-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './goga/Goga-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './goga/Goga-Extralight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './goga/Goga-Thin.otf',
      weight: '100',
      style: 'normal',
    },
  ],
  variable: '--font-goga',
});
