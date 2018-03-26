import React from 'react';
//
import Newsletter from '../../components/Newsletter';
import './style.css';

export default () => (
  <div id="about">
    <section className="about-us">
      <h2>About Us</h2>
      <p>
        Jewish Currents is a non-profit, progressive Jewish media project that has evolved out of a
        70-year-old magazine with a proud heritage of activist journalism. Our mission: to cultivate
        the self-awareness of Jews as builders of a better world, and to jazz up Jewish identity
        with art and creative expression. JC is unique among Jewish publications in its historical
        awareness, its integration of art and politics, its commitment to Jewish diversity, and the
        independence and unpretentiousness of its voice.
      </p>
    </section>
    <section className="contact-info">
      <h2>Contact Us</h2>
      <div className="p-info-columns">
        <div className="column">
          <h3>General Inquiries</h3>
          <p>
            <a href="mailto:hello@jewishcurrents.org">hello@jewishcurrents.org</a>
          </p>
          <h3>Editorial Inquiries</h3>
          <p>
            <a href="mailto:hello@jewishcurrents.org">edit@jewishcurrents.org</a>
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
        <div className="column">
          <h3>Contributing Editors</h3>
          <p>
            Madeline Mclaughlin <br />
            Adrianna Hamilton <br />
            Scott Clarke
          </p>
        </div>
      </div>
    </section>
    <section className="contact-jc">
      <h2>How to Contact Jewish Currents</h2>
      <div className="body">
        <h3>General Press Inquiries / Interview Requests</h3>
        <p>
          To contact the Los Angeles Review of Books for press inquiries, including assistance with
          your story, contact information for a LARB writer or editor, or to request an interview
          with a LARB media spokesperson, please contact our Press Office by sending an email to{' '}
          <a href="mailto:pressoffice@lareviewofbooks.org">pressoffice@lareviewofbooks.org</a>. If
          you are on deadline, please indicate that in your correspondence. A LARB press officer
          will respond to you without delay.
        </p>
        <h3>Reprint Rights and Reproductions</h3>
        <p>
          If you are an editor seeking reprint rights to any of our published articles, please send
          an email to <a href="mailto:info@lareviewofbooks.org">info@lareviewofbooks.org</a>. All
          articles published in the Los Angeles Review of Books are available for republication.
        </p>
        <h3>Membership</h3>
        <p>
          For any questions regarding LARB membership, including questions about how to sign up,
          please send an email to{' '}
          <a href="mailto:membership@lareviewofbooks.org">membership@lareviewofbooks.org</a>.
        </p>
      </div>
    </section>
    <section className="testimonials">
      <div className="testimonial">
        <p>
          “Jewish Currents is a non-profit, progressive Jewish media project that has evolved out of
          a 70-year-old magazine with a proud heritage of activist journalism. Our mission: to
          cultivate the self-awareness of Jews as builders of a better world, and to jazz up Jewish
          identity with art and creative expression.”
        </p>
        <div className="source">
          <span className="name">Scott Clarke</span>
        </div>
      </div>
      <div className="testimonial">
        <p>
          “Jewish Currents is a non-profit, progressive Jewish media project that has evolved out of
          a 70-year-old magazine with a proud heritage of activist journalism. Our mission: to
          cultivate the self-awareness of Jews as builders of a better world, and to jazz up Jewish
          identity with art and creative expression.”
        </p>
        <div className="source">
          <span className="name">Scott Clarke</span>
        </div>
      </div>
    </section>
    <section className="staff">
      <h2>Staff</h2>
      <div className="p-info-columns">
        <div className="column">
          <h3>Editor & Publisher</h3>
          <p>Jacob Plitman</p>
          <h3>Creative Director</h3>
          <p>Josiah Werning</p>
          <h3>Managing Director</h3>
          <p>Keaton Carr</p>
          <h3>Associate Editor</h3>
          <p>Keaton Carr</p>
        </div>
        <div className="column">
          <h3>Editorial Board</h3>
          <p>
            Madeline Mclaughlin <br />
            Adrianna Hamilton <br />
            Scott Clarke <br />
            Mackenzie Myers
          </p>
          <h3>Researcher</h3>
          <p>Keaton Carr</p>
          <h3>Editorial Assistant</h3>
          <p>Keaton Carr</p>
        </div>
        <div className="column">
          <h3>Circulation</h3>
          <p>Rebekah Higgins</p>
        </div>
        <div className="column">
          <h3>Contributing Editors</h3>
          <p>
            Madeline Mclaughlin <br />
            Adrianna Hamilton <br />
            Scott Clarke <br />
            Mackenzie Myers <br />
            Courtney Hansen Steven Maxwell <br />
            Tanner Cross <br />
            Keaton Carr <br />
            Isiah Flores <br />
            Rebekah Higgins
          </p>
        </div>
      </div>
    </section>
    <Newsletter />
  </div>
);
