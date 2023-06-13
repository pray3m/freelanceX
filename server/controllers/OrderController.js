import prisma from "../prisma/client.js";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51NIQJ9CJMR0Lai7k16d8Jc4VKX9wFxzOfT5Umia28EUlIzqAYQLGE60eKznODawIhUMSoHzipM23WwOYBTJxUzbD00R99oiTn0"
);

export const createOrder = async (req, res, next) => {
  try {
    if (req.body.gigId) {
      const { gigId } = req.body;
      const gig = await prisma.gig.findUnique({
        where: { id: gigId },
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: gig?.price * 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      await prisma.order.create({
        data: {
          paymentIntent: paymentIntent.id,
          price: gig?.price,
          buyer: { connect: { id: req.userId } },
          gig: { connect: { id: gigId } },
        },
      });
      return res
        .status(201)
        .json({ clientSecret: paymentIntent.client_secret });
    }
    return res.status(400).send("GigId is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error.");
  }
};
