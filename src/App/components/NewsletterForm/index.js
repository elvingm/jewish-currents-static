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

  handleFocus = () => {
    this.setState({ hideLabel: true });
  };

  handleBlur = event => {
    const target = event.target;
    if (target.type === 'email' && target.value > 0) {
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
