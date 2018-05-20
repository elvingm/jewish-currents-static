// TODO: improve accessibility
/* eslint jsx-a11y/click-events-have-key-events: 0 */

import React from 'react';
import classNames from 'classnames';
//
import './style.css';
import SearchForm from '../Form';
import CloseIcon from '../../../assets/img/icons/close.svg';
import { toRGBAString } from '../../../util/helpers';

export default class SearchPopup extends React.Component {
  handleCloseClick = () => {
    this.props.onCloseClick();
  };

  render() {
    const { accentColor } = this.props;

    return (
      <div
        className={classNames({ 'search-popup': true, hidden: !this.props.show })}
        style={{
          background: `radial-gradient(ellipse at center, ${toRGBAString(
            accentColor,
            0.9
          )} 0%, ${toRGBAString(accentColor)} 100%)`
        }}
      >
        <div className="close-icon" onClick={this.handleCloseClick}>
          <img src={CloseIcon} alt="Close Icon" />
        </div>
        <div className="g-content-wrap">
          <SearchForm onResultClick={this.handleCloseClick} />
        </div>
      </div>
    );
  }
}
