import React from 'react';
import { Link } from 'react-static';
//
import './index.css';
import JCLogo from '../../../img/logos/jewishcurrents.svg';
import FacebookLogo from '../../../img/logos/facebook.svg';
import TwitterLogo from '../../../img/logos/twitter.svg';
import InstagramLogo from '../../../img/logos/instagram.svg';

export default () => {
  return (
    <header id="site-header">
      <div className="logo-wrap">
        <Link to="/" className="logo">
          <img src={JCLogo} alt="Jewish Currents Text Logo" />
        </Link>
        <div className="social-icons">
          <a
            href="https://www.facebook.com/jewishcurrents/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={FacebookLogo} alt="Facebook Logo" />
          </a>
          <a href="https://twitter.com/JewishCurrents" target="_blank" rel="noopener noreferrer">
            <img src={TwitterLogo} alt="Twitter Logo" />
          </a>
          <a
            href="https://www.instagram.com/jewishcurrentsmag/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={InstagramLogo} alt="Instagram Logo" />
          </a>
        </div>
      </div>
      <nav>
        <Link to="/category/article">Article</Link>
        <Link to="/category/blog">Blog</Link>
        <Link to="/category/jewdayo">Jewdayo</Link>
        <Link to="/jcultcha-gallery/multimedia">Gallery</Link>
        <a href="http://jewishcurrents.bigcartel.com/" target="_blank" rel="noopener noreferrer">
          Shop
        </a>
        <Link to="/archives">Archives</Link>
        <Link to="/subscribe">Subscribe</Link>
        <Link to="/contact" className="active">
          Contact
        </Link>
      </nav>
    </header>
  );
};
