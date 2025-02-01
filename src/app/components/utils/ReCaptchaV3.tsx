import React, { useEffect } from 'react';
import { webConfig } from './webConfig';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (func: () => unknown) => unknown;
      execute: (
        key: string | undefined,
        options: object,
      ) => Promise<string | undefined>;
    };
  }
}

const defaultSubmitAction = { action: 'submit' };
export const requestRecaptchaV3Token = (
  callback: (token: string | undefined) => unknown,
  options: object = defaultSubmitAction,
  event?: string,
) => {
  const grecaptcha = window.grecaptcha;
  if (!grecaptcha) {
    return callback(undefined);
  }
  grecaptcha.ready(() => {
    grecaptcha.execute(webConfig.recaptchaV3Key, options).then(callback);
  });
};

const ReCaptchaV3: React.FC<{ className?: string; hideText?: boolean }> = ({
  hideText,
}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${webConfig.recaptchaV3Key}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    const recaptchaDiv = document.getElementsByClassName(
      'grecaptcha-badge',
    )[0] as HTMLElement | undefined;
    if (recaptchaDiv) {
      recaptchaDiv.style.display = 'block';
    }

    return () => {
      document.body.removeChild(script);
      const recaptchaDiv = document.getElementsByClassName(
        'grecaptcha-badge',
      )[0] as HTMLElement;
      if (!recaptchaDiv) {
        return;
      }
      recaptchaDiv.style.display = 'none';
    };
  }, []);

  if (hideText) {
    return null;
  }
};

export default ReCaptchaV3;
