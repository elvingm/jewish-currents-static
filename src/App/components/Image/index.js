import React from 'react';

export default ({ alt, src, steps = [250, 500, 750, 1000, 1500, 2000, 2500], sizes = '100vw' }) => {
  const base = 'https://www.datocms-assets.com';
  const srcwebp = steps.map(s => `${base}${src}?fm=webp&fit=max&auto=format&q=80&w=${s} ${s}w`);
  const srcjpg = steps.map(s => `${src} ${s}w`);
  return (
    <picture>
      <source type="image/webp" srcSet={srcwebp} sizes={sizes} />
      <img src={src} srcSet={srcjpg} sizes={sizes} alt={alt} />
    </picture>
  );
};
