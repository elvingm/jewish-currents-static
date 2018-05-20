export const toRGBString = ({ red, green, blue }) => `rgb(${red},${green},${blue})`;
export const toRGBAString = ({ red, green, blue }, alpha = 1) =>
  `rgba(${red},${green},${blue}, ${alpha})`;
export const toAssetURL = path => `https://www.datocms-assets.com${path}`;
