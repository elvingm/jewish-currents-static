import React from 'react';

import FacebookIcon from './Facebook';
import TwitterIcon from './Twitter';
import InstagramIcon from './Instagram';

export default props => {
  let SocialIcon;
  switch (props.network) {
    case 'facebook':
      SocialIcon = <FacebookIcon fill={props.iconColor} />;
      break;
    case 'twitter':
      SocialIcon = <TwitterIcon fill={props.iconColor} />;
      break;
    case 'instagram':
      SocialIcon = <InstagramIcon fill={props.iconColor} />;
      break;
    default:
      break;
  }
  return (
    <a href={props.url} target="_blank" rel="noopener noreferrer">
      {SocialIcon}
    </a>
  );
};
