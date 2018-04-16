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
import NoticePopup from '../NoticePopup';

export default withRouteData(
  class Header extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        menuActive: false,
        showPushcartNotice: false,
        showArchivesNotice: false
      };
    }

    handleMenuClick = () => {
      this.setState({ menuActive: !this.state.menuActive });
    };

    handleArchiveOpen = () => {
      this.setState({ showArchivesNotice: true });
    };

    handleArchiveClose = () => {
      this.setState({ showArchivesNotice: false });
    };

    handlePushcartOpen = () => {
      this.setState({ showPushcartNotice: true });
    };

    handlePushcartClose = () => {
      this.setState({ showPushcartNotice: false });
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
            <a
              href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UCKPHGTHEGGMC"
              target="_blank"
              rel="noopener noreferrer"
            >
              Subscribe
            </a>
            <a
              href="https://visitor.r20.constantcontact.com/d.jsp?llr=i4bnxifab&p=oi&m=1105173317608&sit=he77xk6fb&f=28bfcc5c-c9c2-4990-b570-dc893dd16623"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jewdayo
            </a>
            <a href="#" onClick={this.handleArchiveOpen}>
              Archives
            </a>
            <a href="#" onClick={this.handlePushcartOpen}>
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
          </nav>
          <NoticePopup onCloseClick={this.handleArchiveClose} show={this.state.showArchivesNotice}>
            <h2>
              We will soon relaunch the extensive Sid Resnick Memorial Archives and Schappes Center
              for Cultural Jewish Life. Stay tuned!
            </h2>
          </NoticePopup>
          <NoticePopup onCloseClick={this.handlePushcartClose} show={this.state.showPushcartNotice}>
            <h2>Stay tuned for our online store for unique gifts, books, and more.</h2>
          </NoticePopup>
        </header>
      );
    }
  }
);
