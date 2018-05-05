import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';

import './style.css';
import SubscribeForm from './SubscribeForm';

export default class SubscribePopup extends React.Component {
  constructor() {
    super();
    this.state = { stripe: null };
  }

  componentDidMount() {
    // componentDidMount only runs in a browser environment.
    // In addition to loading asynchronously, this code is safe to server-side render.

    // You can inject a script tag manually like this,
    // or you can use the 'async' attribute on the Stripe.js v3 <script> tag.
    const stripeJs = document.createElement('script');
    stripeJs.src = 'https://js.stripe.com/v3/';
    stripeJs.async = true;
    stripeJs.onload = () => {
      this.setState({
        // eslint-disable-next-line no-undef
        stripe: window.Stripe(STRIPE_API_KEY)
      });
    };

    // eslint-disable-next-line no-unused-expressions
    document.body && document.body.appendChild(stripeJs);
  }

  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements>
          <SubscribeForm />
        </Elements>
      </StripeProvider>
    );
  }
}
