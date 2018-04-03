import React from 'react';
import { Link } from 'react-static';
import classNames from 'classnames';
//-
import './style.css';
import CloseIcon from '../../assets/img/icons/close.svg';

export default class SubscriptionPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.showPopup();
    }, this.props.wait);
  }

  showPopup = () => {
    this.setState({ hidden: false });
  };

  closePopup = () => {
    this.setState({ hidden: true });
  };

  render() {
    return (
      <div className={classNames({ 'subscribe-popup': true, hidden: this.state.hidden })}>
        <div className="g-content-wrap">
          <div className="close-icon" onClick={this.closePopup}>
            <img src={CloseIcon} alt="Close Icon" />
          </div>
          <div className="content">
            <h2>Subscribe</h2>
            <p>New subscribers SAVE $12 off the annual subscription price and get a FREE book!</p>
            <Link to="/subscribe" className="g-button">
              Subscribe Now
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
