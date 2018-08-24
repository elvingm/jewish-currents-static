require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PLAN_KEYS = {
  MONTHLY_DONATION_5: process.env.MONTHLY_DONATION_5_PLAN_KEY,
  MONTHLY_DONATION_18: process.env.MONTHLY_DONATION_18_PLAN_KEY,
  MONTHLY_DONATION_36: process.env.MONTHLY_DONATION_36_PLAN_KEY,
  MONTHLY_DONATION_72: process.env.MONTHLY_DONATION_72_PLAN_KEY
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
  if (!data.id && !data.email && !data.frequency && !data.amount && !data.idempotency_key) {
    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({ status: 'Missing token information.' })
    });

    return;
  }

  stripe.customers
    .create({
      email: data.email,
      source: data.id,
      shipping: data.shipping
    })
    .then(customer => {
      if (data.frequency === 'one_time') {
        const amountCents = data.amount * 100;

        return stripe.charges.create(
          {
            amount: amountCents,
            currency: 'USD',
            customer: customer.id,
            statement_descriptor: 'Jewish Currents'
          },
          { idempotency_key: data.idempotency_key }
        );
      }

      const stripePlanId = PLAN_KEYS[`MONTHLY_DONATION_${data.amount}`];
      return stripe.subscriptions.create(
        {
          customer: customer.id,
          items: [{ plan: stripePlanId }]
        },
        { idempotency_key: data.idempotency_key }
      );
    })
    .then(purchase => {
      const { status } = purchase;
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
