import React from 'react';
import { Link, withRouteData } from 'react-static';
import classNames from 'classnames';
//
import './style.css';
import { SITE_PRIMARY_COLOR } from '../../util/constants';
import { toRGBString } from '../../util/helpers';
import JCLogo from '../../assets/img/logos/jewishcurrents.svg';
import MenuIcon from '../../assets/img/icons/menu.svg';
import CloseIcon from '../../assets/img/icons/close.svg';
import SocialLink from '../SocialLink';

export default withRouteData(
  class Header extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        menuActive: false
      };
    }

    handleMenuClick = () => {
      this.setState({ menuActive: !this.state.menuActive });
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
            <a href="#" className="subscribe-trigger">
              Subscribe
            </a>
            <a href="#" className="donate-trigger">
              Donate
            </a>
            <a href="/jewdayo-signup">Jewdayo</a>
            <a href="#" className="coming-soon-trigger">
              Archives
            </a>
            <a href="#" className="coming-soon-trigger">
              Pushcart
            </a>
            <Link to="/about" activeClassName="active">
              About Us
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
          </nav>
        </header>
      );
    }
  }
);
