import { logInfo } from './logging';
import { webConfig } from './webConfig';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url: URL): void => {
  const eventData = {
    page_path: url,
  };
  if (webConfig.isProduction && webConfig.gaTrackingId && window.gtag) {
    window.gtag('config', webConfig.gaTrackingId, eventData);
  } else {
    logInfo('pageView', eventData);
  }
};

interface GTagEvent {
  action: string;
  category: string;
  label: string;
  value: number;
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const trackEvent = ({
  action,
  category,
  label,
  value,
}: GTagEvent): void => {
  const eventData = {
    event_category: category,
    event_label: label,
    value,
  };
  if (webConfig.isProduction && window.gtag) {
    window.gtag('event', action, eventData);
  } else {
    logInfo(`event: ${action}`, eventData);
  }
};
