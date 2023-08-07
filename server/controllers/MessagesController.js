import prisma from "../prisma/client.js";

export const addMessage = async (req, res, next) => {
  try {
    if (req.body.receiverId && req.body.message && req.params.orderId) {
      const message = await prisma.messages.create({
        data: {
          sender: {
            connect: { id: req.userId },
          },
          receiver: {
            connect: { id: req.body.receiverId },
          },
          order: {
            connect: { id: req.params.orderId },
          },
          text: req.body.message,
        },
      });
      return res.status(201).json({ message });
    }
    return res
      .status(400)
      .send("userId, receiverId, orderId and message is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getMessages = async (req, res, next) => {
  try {
    if (req.params.orderId && req.userId) {
      const messages = await prisma.messages.findMany({
        where: {
          order: {
            id: req.params.orderId,
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      await prisma.messages.updateMany({
        where: {
          orderId: req.params.orderId,
          receiverId: req.userId,
        },
        data: {
          isRead: true,
        },
      });
      const order = await prisma.order.findUnique({
        where: { id: req.params.orderId },
        include: { gig: true },
      });
      let receiverId;
      if (order?.buyerId === req.userId) {
        receiverId = order.gig.userId;
      } else if (order?.gig.userId === req.userId) {
        receiverId = order.buyerId;
      }
      return res.status(200).json({ messages, receiverId });
    }
    return res.status(400).send("Order id is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
