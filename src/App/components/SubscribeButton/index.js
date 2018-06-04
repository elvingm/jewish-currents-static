import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import uuid from 'uuid/v4';
import StripeCheckout from 'react-stripe-checkout';

const PLAN_DETAILS = {
  Domestic: {
    amount: 1800,
    description: 'Yearly Subscription - Domestic'
  },
  International: {
    amount: 4000,
    description: 'Yearly Subscription - International'
  },
  Lifetime: {
    amount: 30000,
    description: 'Lifetime Subscription'
  }
};

class SubscribeButton extends React.Component {
  onToken = token => {
    const { plan } = this.props;
    const idempotency_key = uuid();
    axios
      .post('/.netlify/lambda/subscribe', { ...token, plan, idempotency_key })
      .then(response => {
        if (response.status !== 200) {
          console.error('Subscription failed with error:', response.data);
        }
        console.log('Subscription created:', response);
      })
      .catch(err => {
        throw Error(err);
      });
  };

  render() {
    const { plan, buttonText } = this.props;
    const { amount, description } = PLAN_DETAILS[plan];

    return (
      <StripeCheckout
        name="Jewish Currents"
        description={description}
        image="/img/jewishcurrents-initials.png"
        // Note: Enabling either address option will give the user the ability to
        // fill out both. Addresses are sent as a second parameter in the token callback.
        billingAddress
        shippingAddress
        amount={amount}
        stripeKey={STRIPE_PUBLISHABLE_KEY} // eslint-disable-line no-undef
        token={this.onToken} // submit callback
      >
        <button className="g-underline-link">{buttonText}</button>
      </StripeCheckout>
    );
  }
}

SubscribeButton.propTypes = {
  plan: PropTypes.string,
  buttonText: PropTypes.string
};

SubscribeButton.defaultProps = {
  plan: 'Domestic',
  buttonText: 'Subscribe'
};

export default SubscribeButton;
