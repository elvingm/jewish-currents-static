require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const YEARLY_PLAN_ID = 'plan_CxcE8XbYOL5KAT';
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

  console.log('stripe form data', JSON.stringify(event));

  // Parse the body contents into an object.
  const data = JSON.parse(event.body);
  const { token, amount, idempotency_key } = data;

  // Make sure we have all required data. Otherwise, escape.
  if (!token || !amount || !idempotency_key) {
    console.error('Required information is missing.');

    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({ status: 'missing-information' })
    });

    return;
  }

  console.log('stripe form data', JSON.stringify(data));

  const customer = stripe.customer.create({
    email: token.email
  });

  console.log('customer res', customer);

  if (customer.id) {
    stripe.subscriptions.create(
      {
        customer: customer.id,
        items: [{ plan: YEARLY_PLAN_ID }]
      },
      {
        idempotency_key
      },
      (err, subscription) => {
        if (err !== null) {
          console.log(err);
        }

        const status =
          subscription === null || subscription.status !== 'succeeded'
            ? 'failed'
            : subscription.status;

        callback(null, {
          statusCode,
          headers,
          body: JSON.stringify({ status })
        });
      }
    );
  }
};
