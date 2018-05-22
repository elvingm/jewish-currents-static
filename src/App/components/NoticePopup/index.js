// TODO: improve accessibility
/* eslint jsx-a11y/click-events-have-key-events: 0 */

import React from 'react';
import classNames from 'classnames';
//-
import './style.css';
import CloseIcon from '../../assets/img/icons/close.svg';

export default class NoticePopup extends React.Component {
  handleCloseClick = () => {
    this.props.onCloseClick();
  };

  render() {
    return (
      <div className={classNames({ 'notice-popup': true, hidden: !this.props.show })}>
        <div className="g-content-wrap">
          <div className="close-icon" onClick={this.handleCloseClick}>
            <img src={CloseIcon} alt="Close Icon" />
          </div>
        </div>
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}
