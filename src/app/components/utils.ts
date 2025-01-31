import { webConfig } from './utils/webConfig';

export const assetUrl = (url: string) => {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).assetBaseUrl = webConfig.assetBaseUrl;
  }
  return webConfig.assetBaseUrl ? `${webConfig.assetBaseUrl}${url}` : url;
};
