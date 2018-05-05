import React from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';

class SubscribeForm extends React.Component {
  handleSubmit = event => {
    // We don't want to let default form submission happen here, which would refresh the page.
    event.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({ name: 'Jenny Rosen' }).then(({ token }) => {
      console.log('Received Stripe token:', token);
    });

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  };

  render() {
    const CARD_ELEMENT_OPTIONS = {
      style: {
        base: {
          fontSize: '18px',
          color: '#424770',
          letterSpacing: '0.025em',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#9e2146'
        }
      }
    };

    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.stripe ? (
          <CardElement {...CARD_ELEMENT_OPTIONS} />
        ) : (
          <div className="StripeElement loading" />
        )}
        <button disabled={!this.props.stripe}>Pay</button>
      </form>
    );
  }
}

export default injectStripe(SubscribeForm);
