import React from 'react';
import classNames from 'classnames';

import './style.css';
import CloseIcon from '../../assets/img/icons/close.svg';
import DonateButton from '../DonateButton';

export default class DonatePopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oneTimeFrequencyChecked: false,
      monthlyFrequencyChecked: true
    };
  }

  handleCloseClick = () => {
    this.props.onCloseClick();
  };

  handleOneTimeFrequencyClick = () => {
    if (this.state.monthlyFrequencyChecked) this.setState({ monthlyFrequencyChecked: false });
    this.setState({ oneTimeFrequencyChecked: true });
  };

  handleMonthlyFrequencyClick = () => {
    if (this.state.oneTimeFrequencyChecked) this.setState({ oneTimeFrequencyChecked: false });
    this.setState({ monthlyFrequencyChecked: true });
  };

  frequency = () => (this.state.monthlyFrequencyChecked ? 'Monthly' : 'One Time');

  render() {
    return (
      <div className={classNames({ 'donate-popup': true, hidden: this.props.hidden })}>
        <div className="g-content-wrap">
          <div className="close-icon" onClick={this.handleCloseClick}>
            <img src={CloseIcon} alt="Close Icon" />
          </div>
          <div className="content">
            <h2>Fill this in</h2>

            <fieldset className="frequency-options">
              <ul>
                <li>
                  <label
                    className={classNames({
                      'g-button': true,
                      checked: this.state.oneTimeFrequencyChecked
                    })}
                    htmlFor="frequency_onetime"
                  >
                    <input
                      type="radio"
                      name="frequency"
                      id="frequency_onetime"
                      value="onetime"
                      onClick={this.handleOneTimeFrequencyClick}
                    />
                    Just Once
                  </label>
                </li>
                <li>
                  <label
                    className={classNames({
                      'g-button': true,
                      checked: this.state.monthlyFrequencyChecked
                    })}
                    htmlFor="frequency_monthly"
                  >
                    <input
                      type="radio"
                      name="frequency"
                      id="frequency_monthly"
                      value="monthly"
                      onClick={this.handleMonthlyFrequencyClick}
                    />
                    Give Monthly
                  </label>
                </li>
              </ul>
            </fieldset>

            <fieldset className="amount-options">
              <ul>
                <li>
                  <a className="g-button">
                    <DonateButton frequency={this.frequency()} amount={5} />
                  </a>
                </li>
                <li>
                  <a className="g-button">
                    <DonateButton frequency={this.frequency()} amount={18} />
                  </a>
                </li>
                <li>
                  <a className="g-button">
                    <DonateButton frequency={this.frequency()} amount={36} />
                  </a>
                </li>
                <li>
                  <a className="g-button">
                    <DonateButton frequency={this.frequency()} amount={72} />
                  </a>
                </li>
              </ul>
            </fieldset>
          </div>
        </div>
      </div>
    );
  }
}
