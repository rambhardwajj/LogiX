export const isValidUrl = (url: string) =>
  /^https?:\/\/[^\s$.?#].[^\s]*$/.test(url);