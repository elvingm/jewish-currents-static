// TODO: improve accessibility
/* eslint jsx-a11y/click-events-have-key-events: 0 */
import React from 'react';
import { Link, withRouteData, scrollTo } from 'react-static';
import classNames from '@sindresorhus/class-names';
//
import './style.css';
import { SITE_PRIMARY_COLOR } from '../../util/constants';
import { toRGBString } from '../../util/helpers';
import JCLogo from '../../assets/img/logos/jewishcurrents.svg';
import MenuIcon from '../../assets/img/icons/menu.svg';
import CloseIcon from '../../assets/img/icons/close.svg';
import SearchIcon from '../../assets/img/icons/search-icon.svg';
import SocialLink from '../SocialLink';
import SearchPopup from '../Search/Popup';
import SearchForm from '../Search/Form';
import DonatePopup from '../DonatePopup';

export default withRouteData(
  class Header extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        menuActive: false,
        showSearchPopup: false,
        showDonatePopup: false
      };
    }

    componentDidMount = () => {
      // Always close menu on navigation
      this.setState({
        unlisten: this.props.history.listen(() => {
          if (this.state.menuActive) this.setState({ menuActive: false });
        })
      });
    };

    // NOTE: Only once componentDidMount has been called does React guarantee
    // that componentWillUnmount will later be called for clean up
    componentWillUnmount = () => {
      // Remove History Event Listener
      this.state.unlisten();
    };

    handleSubscribeClick = event => {
      if (typeof document !== 'undefined') {
        event.preventDefault();
        const element = document.querySelector(event.target.hash);
        scrollTo(element, { duration: 500 });
      }
    };

    // TODO: refactor to use React Portals for modals and DRY this up

    handleMenuClick = () => {
      this.setState({ menuActive: !this.state.menuActive, showDonatePopup: false });
    };

    handleSearchOpen = () => {
      this.setState({ showSearchPopup: true });
    };

    handleSearchClose = () => {
      this.setState({ showSearchPopup: false });
    };

    handleDonateOpen = () => {
      this.setState({ menuActive: false, showDonatePopup: true });
    };

    handleDonateClose = () => {
      this.setState({ showDonatePopup: false });
    };

    render() {
      const { themePrimaryColor } = this.props;
      const backgroundColor = themePrimaryColor || SITE_PRIMARY_COLOR;
      return (
        <header id="site-header" style={{ backgroundColor: toRGBString(backgroundColor) }}>
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
              <SocialLink
                url="https://twitter.com/JewishCurrents"
                network="twitter"
                iconColor="#000"
              />
              <SocialLink
                url="https://www.instagram.com/jewishcurrentsmag/"
                network="instagram"
                iconColor="#000"
              />
              <div className="search-toggle" onClick={this.handleSearchOpen}>
                <img className="search-icon" src={SearchIcon} alt="Search Toggle" />
              </div>
            </div>
            <div
              className={classNames({ 'menu-toggle': true, 'menu-active': this.state.menuActive })}
              onClick={this.handleMenuClick}
            >
              <img className="menu-icon" src={MenuIcon} alt="Menu Toggle" />
              <img className="close-icon" src={CloseIcon} alt="Close Toggle" />
            </div>
          </div>
          <nav className={classNames({ 'menu-active': this.state.menuActive })}>
            <button onClick={this.handleDonateOpen}>Donate</button>
            {this.props.currentPage === 'home' ? (
              <a href="#shop-now-ad" onClick={this.handleSubscribeClick}>
                Subscribe
              </a>
            ) : (
              <Link to="/#shop-now-ad">Subscribe</Link>
            )}
            <a
              href="https://visitor.r20.constantcontact.com/d.jsp?llr=i4bnxifab&p=oi&m=1105173317608&sit=he77xk6fb&f=28bfcc5c-c9c2-4990-b570-dc893dd16623"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jewdayo
            </a>
            <a href="https://archive.jewishcurrents.org" target="_blank" rel="noopener noreferrer">
              Archives
            </a>
            <a
              href="https://jewishcurrents.bigcartel.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pushcart
            </a>
            <Link to="/about" activeClassName="active">
              About Us
            </Link>
            <Link to="/submit" activeClassName="active">
              Submissions
            </Link>
            <div className="social-icons">
              <SocialLink
                url="https://www.facebook.com/jewishcurrents/"
                network="facebook"
                iconColor="#000"
              />
              <SocialLink
                url="https://twitter.com/JewishCurrents"
                network="twitter"
                iconColor="#000"
              />
              <SocialLink
                url="https://www.instagram.com/jewishcurrentsmag/"
                network="instagram"
                iconColor="#000"
              />
            </div>
            <SearchForm onResultClick={this.handleMenuClick} placeholderText="Search" />
          </nav>
          <SearchPopup
            show={this.state.showSearchPopup}
            accentColor={backgroundColor}
            onCloseClick={this.handleSearchClose}
            placeholderText="Search Jewish Currents"
          />
          <DonatePopup hidden={!this.state.showDonatePopup} onCloseClick={this.handleDonateClose} />
        </header>
      );
    }
  }
);
