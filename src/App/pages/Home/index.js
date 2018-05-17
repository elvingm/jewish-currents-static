import React from 'react';
import { Head, withRouteData } from 'react-static';
import { chunk } from 'lodash';
//
import Post from '../../components/Post';
import NewsletterForm from '../../components/NewsletterForm';
import NewsletterPopup from '../../components/NewsletterPopup';
import SubscribeCallout from '../../components/SubscribeCallout';
import Image from '../../components/Image';
import './style.css';

const HomePage = ({
  mainFeaturedPost,
  featuredPostColumns,
  featuredPostPaired,
  currentIssueImage,
  pageMeta
}) => {
  const postRowChunks = chunk(featuredPostColumns, 3);
  const shareImageURL = pageMeta.image && `https://www.datocms-assets.com${pageMeta.image.path}`;

  return (
    <div id="home">
      <Head>
        <meta name="description" content={pageMeta.description} />

        {/* Schema.org for Google */}
        <meta item="name" content={pageMeta.title} />
        <meta item="description" content={pageMeta.description} />
        {shareImageURL && <meta item="image" content={shareImageURL} />}

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageMeta.title} />
        <meta name="twitter:description" content={pageMeta.description} />
        {shareImageURL && <meta name="twitter:image:src" content={shareImageURL} />}

        {/* Open Graph general (Facebook, Pinterest & Google+) */}
        <meta property="og:title" content={pageMeta.title} />
        <meta property="og:description" content={pageMeta.description} />
        {shareImageURL && <meta property="og:image" content={shareImageURL} />}
      </Head>
      <div className="g-content-wrap">
        <section className="featured-post">
          <Post {...mainFeaturedPost} useThumbnail />
        </section>
        {postRowChunks[0] && (
          <section className="post-row split-33">
            {postRowChunks[0].map(p => <Post {...p} key={p.id} stackedLayout useThumbnail />)}
          </section>
        )}
        <section id="shop-now-ad">
          <div className="g-border-wrap">
            <div className="image-wrap">
              {currentIssueImage && (
                <Image
                  src={currentIssueImage.path}
                  alt={currentIssueImage.alt}
                  fmt={currentIssueImage.format}
                />
              )}
            </div>
            <div className="issue-details">
              <h2>
                One Year of <br />
                <em>Jewish Currents</em>
              </h2>
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input type="hidden" name="hosted_button_id" value="DW98Q7N7CR46W" />
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <input type="hidden" name="on0" value="Subscription type" />
                        Subscription Type
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <select name="os0">
                          <option value="This sub is for me! (US)">
                            This sub is for me! (US) $18.00 USD
                          </option>
                          <option value="This sub is a gift! (US)">
                            This sub is a gift! (US) $18.00 USD
                          </option>
                          <option value="This sub is for me! (International)">
                            This sub is for me! (International) $40.00 USD
                          </option>
                          <option value="This sub is a gift! (International)">
                            This sub is a gift! (International) $40.00 USD
                          </option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="hidden" name="on1" value="Mailing address" />
                        Mailing address
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="text" name="os1" maxLength="200" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <input type="hidden" name="currency_code" value="USD" />
                <input
                  type="image"
                  src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif"
                  border="0"
                  name="submit"
                  alt="PayPal - The safer, easier way to pay online!"
                />
                <img
                  className="pixel"
                  alt=""
                  border="0"
                  src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
                  width="1"
                  height="1"
                />
              </form>
            </div>
          </div>
        </section>
        <SubscribeCallout />
        <section className="post-row split-40x60">
          {featuredPostPaired.map(p => <Post {...p} key={p.id} stackedLayout useThumbnail />)}
        </section>
        <section className="newsletter-signup">
          <NewsletterForm formId="a3ab65eb-bed1-456e-a221-7310a4bf4d7e" />
        </section>
        {postRowChunks[1] && (
          <section className="post-row split-33">
            {postRowChunks[1].map(p => <Post {...p} key={p.id} stackedLayout useThumbnail />)}
          </section>
        )}
      </div>
      <NewsletterPopup wait={5000} />
    </div>
  );
};

export default withRouteData(HomePage);
