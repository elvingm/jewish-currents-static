import React from 'react';

import FacebookIcon from './Facebook';
import TwitterIcon from './Twitter';

export default ({ network, iconColor, shareUrl, shareText }) => {
  let SocialIcon;
  let url = '';
  switch (network) {
    case 'facebook':
      SocialIcon = <FacebookIcon fill={iconColor} />;
      url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
      break;
    case 'twitter':
      SocialIcon = <TwitterIcon fill={iconColor} />;
      url = `https://twitter.com/intent/tweet?url=${shareUrl}`;
      if (shareText) url += `&text=${shareText} via @jewishcurrents`;
      break;
    default:
      break;
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {SocialIcon}
    </a>
  );
};
