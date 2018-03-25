import React from 'react';
import { Link, withRouteData } from 'react-static';
//
import './style.css';
import JCLogo from '../../assets/img/logos/jewishcurrents.svg';
import FacebookLogo from '../../assets/img/logos/facebook.svg';
import TwitterLogo from '../../assets/img/logos/twitter.svg';
import InstagramLogo from '../../assets/img/logos/instagram.svg';

export default withRouteData(({ currentPage }) => (
  <header id="site-header" className={`accent-${currentPage}`}>
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
      <Link to="/category/article" activeClassName="active">
        Article
      </Link>
      <Link to="/category/blog" activeClassName="active">
        Blog
      </Link>
      <Link to="/category/jewdayo" activeClassName="active">
        Jewdayo
      </Link>
      <Link to="/jcultcha-gallery/multimedia" activeClassName="active">
        Gallery
      </Link>
      <a href="http://jewishcurrents.bigcartel.com/" target="_blank" rel="noopener noreferrer">
        Shop
      </a>
      <Link to="/archives" activeClassName="active">
        Archives
      </Link>
      <Link to="/subscribe" activeClassName="active">
        Subscribe
      </Link>
      <Link to="/" activeClassName="active">
        Contact
      </Link>
    </nav>
  </header>
));
