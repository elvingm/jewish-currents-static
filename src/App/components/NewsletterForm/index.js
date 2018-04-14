import React from 'react';
import classNames from 'classnames';
//
import './style.css';

/**
 * Note: This component contains an injected third-party form.
 * When updating a hard browser refresh is required to see changes.
 */
export default class NewsletterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hideLabel: false };
  }

  handleFocus = event => {
    const emailInput = event.currentTarget.querySelector('#email_address_1');
    this.setState({ hideLabel: emailInput.value.length >= 0 });
  };

  handleBlur = event => {
    const emailInput = event.currentTarget.querySelector('#email_address_1');
    if (emailInput.value.length > 0) {
      this.setState({ hideLabel: true });
    } else {
      this.setState({ hideLabel: false });
    }
  };

  render() {
    return (
      <div className="newsletter-form">
        <h2>Sign up for our mailing list</h2>
        <div
          className={classNames({ 'ctct-inline-form': true, focused: this.state.hideLabel })}
          data-form-id="a3ab65eb-bed1-456e-a221-7310a4bf4d7e"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}