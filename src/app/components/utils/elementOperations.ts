export const getElementHeight = (
  form: HTMLElement,
  inquirySection: HTMLElement,
) => {
  const clone = form.cloneNode(true) as HTMLElement;
  clone.setAttribute('style', 'height: auto;');
  inquirySection.appendChild(clone);
  const height = clone.offsetHeight + 1; // +1 for the border
  inquirySection.removeChild(clone);
  return height;
};
