import { webConfig } from "./utils/webConfig";

export const assetUrl = (url: string) => {
    return webConfig.assetBaseUrl ? `${webConfig.assetBaseUrl}/url` : url;
   }