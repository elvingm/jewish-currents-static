import React from 'react';
import classNames from 'classnames';
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
    setTimeout(this.showPopup, this.props.wait);
  }

  showPopup = () => {
    this.setState({ hidden: false });
  };

  closePopup = () => {
    this.setState({ hidden: true });
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
