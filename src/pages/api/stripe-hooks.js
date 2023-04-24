import Stripe from "stripe";
import { buffer } from "micro";
import { client } from "lib/client";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const signature = req.headers["stripe-signature"];
  const signingSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    const reqBuffer = await buffer(req);

    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
    console.log("event received");
  } catch (err) {
    console.log("error", err);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const session_id = session.id;

    try {
      //retive stripe session and get the items
      const stripeSession = await stripe.checkout.sessions.retrieve(
        session_id,
        {
          expand: ["line_items"],
        }
      );

      const lineItems = stripeSession.line_items.data;

      const paintName = lineItems.map((item) => item.description)[0];

      console.log("paintName", paintName);

      const query = `*[_type == "paint" && name == '${paintName}']`;
      const paint = await client.fetch(query);

      const paintId = paint[0]._id;

      await client
        .patch(paintId) // Document ID to patch
        .set({ sold: true }) // Shallow merge
        .commit(); // Perform the patch and return a promise

      console.log(`Paint with ID ${paintId} marked as sold`);
    } catch (error) {
      console.log("Error retrieving session:", error);
      return res.status(400).send(`Webhook error: ${error.message}`);
    }
  }

  res.json({ received: true });
};

export default handler;
