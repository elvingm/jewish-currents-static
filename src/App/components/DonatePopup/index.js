import React from 'react';
import classNames from 'classnames';

import './style.css';
import CloseIcon from '../../assets/img/icons/close.svg';
import DonateButton from '../DonateButton';

export default class DonatePopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      frequency: 'monthly',
      amount: 18
    };
  }

  handleCloseClick = () => {
    this.props.onCloseClick();
  };

  handleFrequencyClick = event => {
    this.setState({ frequency: event.target.value });
  };

  handleAmountClick = event => {
    this.setState({ amount: Number(event.target.value) });
  };

  amountOptions = () => [5, 18, 36, 72];

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
                      checked: this.state.frequency === 'one_time'
                    })}
                    htmlFor="frequency_one_time"
                  >
                    <input
                      type="radio"
                      name="frequency"
                      id="frequency_one_time"
                      value="one_time"
                      onClick={this.handleFrequencyClick}
                    />
                    Just Once
                  </label>
                </li>
                <li>
                  <label
                    className={classNames({
                      'g-button': true,
                      checked: this.state.frequency === 'monthly'
                    })}
                    htmlFor="frequency_monthly"
                  >
                    <input
                      type="radio"
                      name="frequency"
                      id="frequency_monthly"
                      value="monthly"
                      onClick={this.handleFrequencyClick}
                    />
                    Give Monthly
                  </label>
                </li>
              </ul>
            </fieldset>

            <fieldset className="amount-options">
              <ul>
                {this.amountOptions().map(amount => (
                  <li key={amount}>
                    <label
                      className={classNames({
                        'g-button': true,
                        checked: this.state.amount === amount
                      })}
                      htmlFor={`amount_${amount}`}
                    >
                      <input
                        type="radio"
                        id={`amount_${amount}`}
                        value={amount}
                        onClick={this.handleAmountClick}
                      />
                      ${amount}
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>

            <a className="g-button">
              <DonateButton frequency={this.state.frequency} amount={this.state.amount} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
