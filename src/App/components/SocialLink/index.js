import React from 'react';

import FacebookIcon from './Facebook';
import TwitterIcon from './Twitter';

export default ({ url, network, iconColor, shareUrl, shareText }) => {
  let SocialIcon;
  switch (network) {
    case 'facebook':
      SocialIcon = <FacebookIcon fill={iconColor} />;
      url = shareUrl ? `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` : url;
      break;
    case 'twitter':
      SocialIcon = <TwitterIcon fill={iconColor} />;
      url = shareUrl ? `https://twitter.com/intent/tweet?url=${shareUrl}` : url;
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
