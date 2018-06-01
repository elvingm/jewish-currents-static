require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const YEARLY_PLAN_ID = 'plan_CZpp8FXByEauXF';
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
  const token = JSON.parse(event.body);

  // Make sure we have all required data. Otherwise, escape.
  if (!token.id && !token.email) {
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
      email: token.email,
      source: token.id
    })
    .then(customer => {
      console.log('customer created:', customer);
      return stripe.subscriptions.create({
        customer: customer.id,
        items: [{ plan: YEARLY_PLAN_ID }]
      });
    })
    .then(subscription => {
      console.log('subscription created:', subscription);
      const status =
        subscription === null || subscription.status !== 'succeeded'
          ? 'failed'
          : subscription.status;

      callback(null, {
        statusCode,
        headers,
        body: JSON.stringify({ status })
      });
    })
    .catch(err => {
      throw err;
    });
};
