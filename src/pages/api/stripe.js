import { client } from "lib/client";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        phone_number_collection: {
          enabled: true,
        },
        shipping_address_collection: {
          allowed_countries: [
            "AT",
            "BE",
            "BG",
            "HR",
            "CY",
            "CZ",
            "DK",
            "EE",
            "FI",
            "FR",
            "DE",
            "GR",
            "HU",
            "IE",
            "IT",
            "LV",
            "LT",
            "LU",
            "MT",
            "NL",
            "PL",
            "PT",
            "RO",
            "SK",
            "SI",
            "ES",
            "SE",
            "GB",
          ],
        },
        shipping_options: [
          {
            shipping_rate: "shr_1MgwK0H6Wxdxi7jUHxU3rx0C",
          },
          {
            shipping_rate: "shr_1MgwLhH6Wxdxi7jUGylznQvM",
          },
        ],

        line_items: req.body.cartItems.map((item) => {
          console.log(item._id);
          const image = item.image[0].asset._ref;
          const newImage = image
            .replace(
              "image-",
              "https://cdn.sanity.io/images/tdq96y0q/production/"
            )
            .replace("-webp", ".webp")
            .replace("-jpg", ".jpg")
            .replace("-png", ".png");

          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            quantity: 1,
          };
        }),
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      /*

      //modify the "sold" to true field in Sanity
      req.body.cartItems.forEach(async (item) => {
        const id = item._id;
        const query = `*[_type == "paint" && _id == '${id}'][0]`;
        const sold = true;
        const updateQuery = `*[_type == "paint" && _id == '${id}']{
            "sold": ${sold}
        }`;
        await client.patch(id).set(updateQuery).commit();
      }); */

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
