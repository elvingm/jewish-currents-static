import React from 'react';
import ReactGA from 'react-ga';
import classNames from 'classnames';
import Cookies from 'js-cookie';
//-
import './style.css';
import CloseIcon from '../../assets/img/icons/close.svg';
import NewsletterForm from '../NewsletterForm';

export default class NewsletterPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.showPopup();
    }, this.props.wait);
  }

  showPopup = () => {
    const prompted = Cookies.get('jc:newsletter:prompted');
    if (!prompted) {
      ReactGA.event({
        category: 'Newsletter Popup',
        action: 'open'
      });
      this.setState({ hidden: false });
    }
  };

  closePopup = () => {
    ReactGA.event({
      category: 'Newsletter Popup',
      action: 'close'
    });
    this.setState({ hidden: true });
    Cookies.set('jc:newsletter:prompted', true, { expires: 1, path: '/' });
  };

  render() {
    return (
      <div className={classNames({ 'newsletter-popup': true, hidden: this.state.hidden })}>
        <div className="g-content-wrap">
          <div className="close-icon" onClick={this.closePopup}>
            <img src={CloseIcon} alt="Close Icon" />
          </div>
          <div className="content">
            <NewsletterForm />
          </div>
        </div>
      </div>
    );
  }
}
