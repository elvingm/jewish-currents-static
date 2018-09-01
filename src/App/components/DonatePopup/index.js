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
      amount: 18,
      customAmount: false
    };
  }

  handleCloseClick = () => {
    this.props.onCloseClick();
  };

  handleFrequencyClick = event => {
    this.setState({ frequency: event.target.value });
  };

  handleAmountClick = event => {
    this.setState({ amount: Number(event.target.value), customAmount: false });
  };

  handleCustomAmountClick = () => {
    this.setState({ customAmount: true });
  };

  handleCustomAmountChange = event => {
    const untrucatedCustomAmount = Number.parseFloat(event.target.value);
    const truncatedCustomAmount = untrucatedCustomAmount.toFixed(2);

    this.setState({ amount: Number(truncatedCustomAmount) });
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
            <h2>Support Us</h2>

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

            <ul>
              {this.amountOptions().map(amount => (
                <li key={amount}>
                  <label
                    className={classNames({
                      'g-button': true,
                      checked: !this.state.customAmount && this.state.amount === amount
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

            <ul>
              <li className="custom-amount">
                <label
                  className={classNames({
                    'g-button': true,
                    checked: this.state.customAmount
                  })}
                  htmlFor="custom_amount"
                >
                  <span className="input-descriptor">Other</span>
                  <span className="input-symbol-dollar">
                    <input
                      type="number"
                      id="custom_amount"
                      min="0"
                      onClick={this.handleCustomAmountClick}
                      onChange={this.handleCustomAmountChange}
                    />
                  </span>
                </label>
              </li>
            </ul>

            <DonateButton frequency={this.state.frequency} amount={this.state.amount} />
          </div>
        </div>
      </div>
    );
  }
}
