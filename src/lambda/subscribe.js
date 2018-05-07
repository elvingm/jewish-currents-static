require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
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

  // Make sure we have all required data. Otherwise, escape.
  if (!data.token || !data.amount || !data.idempotency_key) {
    console.error('Required information is missing.');

    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({ status: 'missing-information' })
    });

    return;
  }

  console.log('parsed form data', JSON.stringify(data));

  // const customer = stripe.customer.create({
  //   email: data.token.email
  // })

  // stripe.charges.create(
  //   {
  //     currency: 'usd',
  //     amount: data.amount,
  //     source: data.token.id,
  //     receipt_email: data.token.email,
  //     description: `charge for a widget`
  //   },
  //   {
  //     idempotency_key: data.idempotency_key
  //   }, (err, charge) => {

  //     if(err !== null) {
  //       console.log(err);
  //     }

  //     const status = (charge === null || charge.status !== 'succeeded')
  //       ? 'failed'
  //       : charge.status;

  //     callback(null, {
  //       statusCode,
  //       headers,
  //       body: JSON.stringify({status})
  //     });
  //   }
  // );
};
