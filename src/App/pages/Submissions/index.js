import React from 'react';
import { Head, withRouteData } from 'react-static';
//
import './style.css';
import { SITE_PRIMARY_COLOR } from '../../util/constants';
import { toRGBString } from '../../util/helpers';

const SubmissionsPage = ({ title, content }) => {
  const themeCss = `
    .g-accent {
      color: ${toRGBString(SITE_PRIMARY_COLOR)}
    }
  `;
  return (
    <div id="submissions">
      <Head>
        <style>{themeCss}</style>
      </Head>
      <article>
        <h1 className="g-accent">{title}</h1>
        <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </div>
  );
};

export default withRouteData(SubmissionsPage);
