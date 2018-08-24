import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import uuid from 'uuid/v4';
import StripeCheckout from 'react-stripe-checkout';

class DonateButton extends React.Component {
  onToken = (token, addresses) => {
    const { frequency, amount } = this.props;
    const idempotency_key = uuid();

    const shipping = {
      address: {
        line1: addresses.shipping_address_line1,
        city: addresses.shipping_address_city,
        state: addresses.shipping_address_state,
        postal_code: addresses.shipping_address_zip,
        country: addresses.shipping_address_country
      },
      name: addresses.shipping_name
    };

    axios // eslint-disable-next-line no-undef
      .post(`${LAMBDA_ENDPOINT}/donate`, { ...token, frequency, amount, idempotency_key, shipping })
      .catch(err => {
        throw Error(err);
      });
  };

  render() {
    const { frequency, amount } = this.props;
    const description = `${frequency} $${amount} Donation`;
    const amountCents = amount * 100;

    return (
      <StripeCheckout
        name="Jewish Currents"
        description={description}
        image="/img/jewishcurrents-initials.png"
        panelLabel="Donate"
        // Note: Enabling either address option will give the user the ability to
        // fill out both. Addresses are sent as a second parameter in the token callback.
        billingAddress
        shippingAddress
        amount={amountCents}
        stripeKey={STRIPE_PUBLISHABLE_KEY} // eslint-disable-line no-undef
        token={this.onToken} // submit callback
      >
        <button className="g-underline-link">${amount}</button>
      </StripeCheckout>
    );
  }
}

DonateButton.propTypes = {
  frequency: PropTypes.string,
  amount: PropTypes.number
};

export default DonateButton;
