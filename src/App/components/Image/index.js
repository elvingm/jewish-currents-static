import React from 'react';

export default ({
  alt,
  src,
  steps = [250, 500, 750, 1000, 1500, 2000, 2500],
  sizes = '100vw',
  fmt = 'jpg'
}) => {
  const base = 'https://www.datocms-assets.com';
  const srcwebp = steps.map(s => `${base}${src}?fm=webp&fit=max&auto=format&q=80&w=${s} ${s}w`);
  const defaultSrcSet = steps.map(
    s => `${base}${src}?fm=${fmt}&&fit=max&auto=format&q=80&w=${s} ${s}w`
  );
  return (
    <picture>
      <source type="image/webp" srcSet={srcwebp} sizes={sizes} />
      <img src={`${base}${src}?q=80`} srcSet={defaultSrcSet} sizes={sizes} alt={alt} />
    </picture>
  );
};
