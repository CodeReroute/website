export const noOp = () => null;

export const scrollToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

export const scrollToBottom = () => {
  window.scrollTo(0, window.innerHeight);
};

export const freezeScroll = (
  onUnfreeze?: () => unknown,
  time: number = 500,
) => {
  const scrollTop = window.scrollY;

  window.onscroll = () => {
    window.scrollTo(0, scrollTop);
  };

  setTimeout(() => {
    window.onscroll = null;
    onUnfreeze?.();
  }, time);
};
