import React from 'react';
import { withRouteData } from 'react-static';
//
import NewsletterForm from '../../components/NewsletterForm';
import './style.css';

const AboutPage = () => (
  <div id="about">
    <section className="about-us">
      <h2>About Us</h2>
      <p>
        Founded in 1946, <em>Jewish Currents</em> is a magazine committed to the rich tradition of
        Left Jewish thought, activism, and culture.
      </p>
    </section>
    <section className="staff">
      <h2>Who We Are</h2>
      <div className="p-info-columns">
        <div className="column">
          <h3>Editor</h3>
          <p>Lawrence Bush</p>
          <h3>Executive Editor</h3>
          <p>Jacob Plitman</p>
          <h3>Senior Editors</h3>
          <p>
            Arielle Angel, Literary Editor <br />
            Maia Ipp, Editor for Public Programs <br />
            Noah Kulwin, News and Features Editor
          </p>
          <h3>Arts Consultant</h3>
          <p>Esther Cohen</p>
        </div>
        <div className="column">
          <h3>Contributing Writers</h3>
          <p>
            Mitchell Abidor <br />
            Rabbi Reba Carmel <br />
            Esther Cohen <br />
            Dick Flacks <br />
            Alessio Franko <br />
            Zelda Gamson <br />
            Mikhail Horowitz <br />
            David Klion <br />
            Myriam Miedzian <br />
            Bennett Muraskin <br />
            Susan Reimer-Torn <br />
            Martha Roth <br />
            Marty Roth <br />
            Joel Schechter <br />
            Diana Scott <br />
            Ralph Seliger <br />
            Sarah Seltzer <br />
            Dusty Sklar <br />
            Eli Valley <br />
            Rabbi Judy Weiss <br />
            Anna Wrobel
          </p>
        </div>
        <div className="column">
          <h3>Editorial Board</h3>
          <p>
            Naomi Dann <br />
            Helen Engelhardt <br />
            Lauren Goldenberg <br />
            Esther Leysorek Goodman <br />
            Nicholas Jahr <br />
            Marc Jampole <br />
            Milton Kant <br />
            Alexander C. Kaufman <br />
            Jessica de Koninck <br />
            Allan Lichtenstein <br />
            Jacob L. Perl <br />
            Alice Radosh <br />
            Judith Rosenbaum <br />
            Tali Stolzenberg-Myers <br />
            Robert Winston <br />
            Basia Yoffe <br />
            Tamar Zinn <br />
            Barnett Zumoff
          </p>
        </div>
      </div>
    </section>
    <section className="contact-info">
      <h2>Contact Us</h2>
      <div className="p-info-columns">
        <div className="column">
          <h3>General Inquiries</h3>
          <p>
            <a href="mailto:info@jewishcurrents.org">info@jewishcurrents.org</a>
          </p>
          <h3>Tips</h3>
          <p>
            <a href="mailto:tips@jewishcurrents.org">tips@jewishcurrents.org</a>
          </p>
          <h3>To Advertise</h3>
          <p>
            <a href="mailto:ads@jewishcurrents.org">ads@jewishcurrents.org</a>
          </p>
          <h3>Press Inquiries</h3>
          <p>
            <a href="mailto:press@jewishcurrents.org">press@jewishcurrents.org</a>
          </p>
        </div>
        <div className="column">
          <h3>Post</h3>
          <p>
            Jewish Currents <br />
            POB 111, Accord NY <br />
            12404
          </p>
        </div>
        <div className="column">
          <h3>Phone</h3>
          <p>(845) 626-2427</p>
        </div>
      </div>
    </section>
    <section className="newsletter-signup">
      <NewsletterForm />
    </section>
  </div>
);

export default withRouteData(AboutPage);
