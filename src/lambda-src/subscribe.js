require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PLAN_KEYS = {
  Domestic: process.env.DOMESTIC_PLAN_KEY,
  International: process.env.INTERNATIONAL_PLAN_KEY,
  Lifetime: process.env.LIFETIME_PLAN_KEY
};
const statusCode = 200;
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type'
};

exports.handler = (event, context, callback) => {
  // We only care to do anything if this is our POST request.
  // e.g. OPTIONS preflight request for CORS
  if (event.httpMethod !== 'POST') {
    callback(null, {
      statusCode,
      headers,
      body: ''
    });
  }

  // Parse the body contents into an object.
  const data = JSON.parse(event.body);

  // Make sure we have all required data. Otherwise, escape.
  if (!data.id && !data.email && !data.plan && !data.idempotency_key) {
    console.error('Error tokenizing customer payment information.');

    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({ status: 'missing token information' })
    });

    return;
  }

  stripe.customers
    .create({
      email: data.email,
      source: data.id
    })
    .then(customer => {
      if (data.plan === 'Lifetime') {
        return stripe.charges.create(
          {
            amount: 30000,
            currency: 'usd',
            customer: customer.id,
            description: 'Jewish Currents - Lifetime Subscription',
            statement_descriptor: 'Jewish Currents - Life'
          },
          { idempotency_key: data.idempotency_key }
        );
      }

      return stripe.subscriptions.create(
        {
          customer: customer.id,
          items: [{ plan: PLAN_KEYS[data.plan] }]
        },
        { idempotency_key: data.idempotency_key }
      );
    })
    .then(purchase => {
      const { status } = purchase;
      console.log('Purchase Completed:', purchase);
      callback(null, {
        statusCode,
        headers,
        body: JSON.stringify({ status })
      });
    })
    .catch(err => {
      const { statusCode, headers, message } = err;
      callback(null, {
        statusCode,
        headers,
        body: JSON.stringify({ message })
      });
      throw Error(err);
    });
};
