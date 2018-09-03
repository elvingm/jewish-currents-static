import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import uuid from 'uuid/v4';
import StripeCheckout from 'react-stripe-checkout';

class DonateButton extends React.Component {
  onComplete = () => {
    this.props.onComplete();
  };

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
      .post('http://localhost:3000/.netlify/lambda/donate', {
        ...token,
        frequency,
        amount,
        idempotency_key,
        shipping
      })
      .then(() => {
        this.onComplete();
      })
      .catch(err => {
        throw Error(err);
      });
  };

  render() {
    const { frequency, amount } = this.props;
    const formattedFrequency = frequency === 'one_time' ? 'One Time' : 'Monthly';
    const description = `${formattedFrequency} $${amount} Donation`;
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
        stripeKey="pk_test_pEnT3io8zbnumLXLXutNT58N" // eslint-disable-line no-undef
        token={this.onToken} // submit callback
      >
        <button className="g-button">Donate</button>
      </StripeCheckout>
    );
  }
}

DonateButton.propTypes = {
  frequency: PropTypes.string,
  amount: PropTypes.number
};

export default DonateButton;
