import initStripe from "stripe";

/* export const handler = async (req, res) => {
  debugger;
  const stripe = initStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

  const signature = req.headers["stripe-signature"];
  const signingSecret = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;

  debugger;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req, signature, signingSecret);
    console.log("event received");

    res.send({ received: true });
  } catch (err) {
    console.log("error", err);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  console.log("event", event);
}; */
