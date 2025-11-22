import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const PRODUCTS = {
    chair: 3499,
    sofa: 12999,
    desk: 7999,
    table: 4599
  };

  try {
    const { productId, quantity } = req.body;

    if (!PRODUCTS[productId]) {
      return res.status(400).json({ error: "Invalid product" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer_creation: "always",

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: productId },
            unit_amount: PRODUCTS[productId] * 100
          },
          quantity
        }
      ],

      success_url: `${req.headers.origin}/?success=1`,
      cancel_url: `${req.headers.origin}/?canceled=1`
    });

    res.status(200).json({ url: session.url });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
