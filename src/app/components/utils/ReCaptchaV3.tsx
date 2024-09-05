import React, { useEffect } from 'react';
import { webConfig } from './webConfig';

const DISABLE_CAPTCHA = false;
const logError = console.error;

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
    if (!DISABLE_CAPTCHA) {
      logError(`Unable to load Google Recaptcha in '${event}'.`, {
        event,
        isRecaptchaEnvSet: Boolean(webConfig.recaptchaV3Key),
      });
    }
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

  return (
    <div className="recaptcha">
      This site is protected by reCAPTCHA and the Google{' '}
      <a
        href={'https://policies.google.com/privacy'}
        rel={'noopener noreferrer'}
        target={'_blank'}
      >
        Privacy Policy
      </a>{' '}
      and{' '}
      <a
        href={'https://policies.google.com/terms'}
        rel={'noopener noreferrer'}
        target={'_blank'}
      >
        Terms of Service
      </a>{' '}
      apply.
    </div>
  );
};

export default ReCaptchaV3;
