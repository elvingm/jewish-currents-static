require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const STRIPE_DONATION_PRODUCT = process.env.STRIPE_DONATION_PRODUCT;

const findPlan = planAmount => {
  const paginateStripeAPI = (getMore, options = {}, previousList = []) => {
    const latestItem = previousList[previousList.length - 1];
    const starting_after = latestItem ? latestItem.id : undefined;

    return getMore({ limit: 100, starting_after, ...options }).then(newList => {
      const fullList = [...previousList, ...newList.data];

      return !newList.has_more
        ? Promise.resolve(fullList)
        : paginateStripeAPI(getMore, options, fullList);
    });
  };

  return paginateStripeAPI(options => {
    options.product = STRIPE_DONATION_PRODUCT;
    return stripe.plans.list(options);
  })
    .then(plans => plans.find(plan => plan.amount / 100 === planAmount))
    .catch(err => {
      throw Error(err);
    });
};

const createPlan = planAmount =>
  stripe.plans.create({
    amount: planAmount * 100,
    currency: 'USD',
    interval: 'month',
    product: STRIPE_DONATION_PRODUCT,
    nickname: `Monthly $${planAmount}`
  });

const findOrCreatePlan = planAmount =>
  findPlan(planAmount)
    .then(plan => plan || createPlan(planAmount))
    .catch(err => {
      throw Error(err);
    });

const createOneTimeDonation = (customer, amount, idempotencyKey) => {
  const amountCents = amount * 100;

  return stripe.charges.create(
    {
      amount: amountCents,
      currency: 'USD',
      customer: customer.id,
      statement_descriptor: 'Jewish Currents'
    },
    { idempotency_key: idempotencyKey }
  );
};

const createRecurringDonation = (customer, amount, idempotencyKey) =>
  findOrCreatePlan(amount)
    .then(plan =>
      stripe.subscriptions.create(
        {
          customer: customer.id,
          items: [{ plan: plan.id }]
        },
        { idempotency_key: idempotencyKey }
      )
    )
    .catch(err => {
      throw Error(err);
    });

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
    .then(
      customer =>
        data.frequency === 'one_time'
          ? createOneTimeDonation(customer, data.amount, data.idempotency_key)
          : createRecurringDonation(customer, data.amount, data.idempotency_key)
    )
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
