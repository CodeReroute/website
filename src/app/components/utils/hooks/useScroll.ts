import { useEffect, useState } from 'react';
import { freezeScroll } from '../pageUtils';

export const useScroll = () => {
  const [scrollDirection, setScrollDirection] = useState<{
    direction: string;
  } | null>(null);
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [bottomSectionShown, setBottomSectionShown] = useState<boolean>(false);
  const [topSectionShown, setTopSectionShown] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollTop > lastScrollTop) {
        setTopSectionShown(false);
        setScrollDirection({ direction: 'down' });
        setBottomSectionShown(scrollTop > 0);
      } else {
        setBottomSectionShown(false);
        setScrollDirection({ direction: 'up' });
        setTopSectionShown(scrollTop < viewportHeight);
      }
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [
    lastScrollTop,
    setScrollDirection,
    setTopSectionShown,
    setBottomSectionShown,
    setLastScrollTop,
  ]);

  useEffect(() => {
    if (!topSectionShown) return;
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }, [topSectionShown]);

  useEffect(() => {
    if (!bottomSectionShown) return;
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'instant',
    });
    freezeScroll(() => setBottomSectionShown(false));
  }, [bottomSectionShown]);

  return { scrollDirection, lastScrollTop };
};
