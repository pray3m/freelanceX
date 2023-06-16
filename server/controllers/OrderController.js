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

export const confirmOrder = async (req, res, next) => {
  try {
    if (req.body.paymentIntent) {
      await prisma.order.update({
        where: { paymentIntent: req.body.paymentIntent },
        data: { isCompleted: true },
      });
    }
    return res.status(200).send("Order confirmed.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error.");
  }
};

export const getBuyerOrders = async (req, res, next) => {
  try {
    if (req.userId) {
      const orders = await prisma.order.findMany({
        where: { buyerId: req.userId, isCompleted: true },
        include: {
          gig: true,
          gig: {
            include: {
              createdBy: true,
            },
          },
        },
      });
      return res.status(200).json({ orders });
    }
    return res.status(400).send("UserId is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error.");
  }
};

export const getSellerOrders = async (req, res, next) => {
  try {
    if (req.userId) {
      const orders = await prisma.order.findMany({
        where: {
          gig: {
            createdBy: {
              id: req.userId,
            },
          },
          isCompleted: true,
        },
        include: {
          gig: true,
          buyer: true,
        },
      });
      return res.status(200).json({ orders });
    }
    return res.status(400).send("UserId is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error.");
  }
};
