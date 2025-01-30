export const assetUrl = (url: string) => {
    return webConfig.baseUrl ? `${webConfig.baseUrl}/url` : url;
   }