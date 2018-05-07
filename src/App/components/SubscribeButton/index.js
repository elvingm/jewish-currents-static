import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
//

class SubscribeButton extends React.Component {
  onToken = token => {
    axios.post('/.netlify/lambda/subscribe', token).then(response => {
      response.json().then(data => {
        console.log(data);
        alert(`We are in business, ${data}`);
      });
    });
  };

  render() {
    return (
      <StripeCheckout
        name="Jewish Currents"
        description="Yearly Subscription"
        image="/img/jewishcurrents-initials.png"
        // Note: Enabling either address option will give the user the ability to
        // fill out both. Addresses are sent as a second parameter in the token callback.
        shippingAddress
        stripeKey={STRIPE_PUBLISHABLE_KEY} // eslint-disable-line no-undef
        token={this.onToken} // submit callback
      >
        <button className="btn btn-primary">CLICK DIS BUTTON</button>
      </StripeCheckout>
    );
  }
}

export default SubscribeButton;
