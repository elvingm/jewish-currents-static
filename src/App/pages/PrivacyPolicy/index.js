import React from 'react';
import { withRouteData } from 'react-static';
//
import './style.css';

const PrivacyPolicyPage = ({ content }) => (
  <div id="privacy-policy">
    <article>
      <h1>Privacy Policy</h1>
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  </div>
);

export default withRouteData(PrivacyPolicyPage);
