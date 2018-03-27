import React from 'react';
import { Link, withRouteData } from 'react-static';
//
import './style.css';
import JCLogo from '../../assets/img/logos/jewishcurrents.svg';
import MenuIcon from '../../assets/img/icons/menu.svg';
import CloseIcon from '../../assets/img/icons/close.svg';
import SocialLink from '../SocialLink';

export default withRouteData(({ currentPage }) => (
  <header id="site-header" className={`accent-${currentPage}`}>
    <div className="logo-wrap">
      <Link to="/" className="logo">
        <img src={JCLogo} alt="Jewish Currents Text Logo" />
      </Link>
      <div className="social-icons">
        <SocialLink
          url="https://www.facebook.com/jewishcurrents/"
          network="facebook"
          iconColor="#000"
        />
        <SocialLink url="https://twitter.com/JewishCurrents" network="twitter" iconColor="#000" />
        <SocialLink
          url="https://www.instagram.com/jewishcurrentsmag/"
          network="instagram"
          iconColor="#000"
        />
      </div>
      <div className="menu-toggle">
        <img className="menu-icon" src={MenuIcon} alt="Menu Toggle" />
        <img className="close-icon" src={CloseIcon} alt="Close Toggle" />
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
      <div className="social-icons">
        <SocialLink
          url="https://www.facebook.com/jewishcurrents/"
          network="facebook"
          iconColor="#000"
        />
        <SocialLink url="https://twitter.com/JewishCurrents" network="twitter" iconColor="#000" />
        <SocialLink
          url="https://www.instagram.com/jewishcurrentsmag/"
          network="instagram"
          iconColor="#000"
        />
      </div>
    </nav>
  </header>
));
