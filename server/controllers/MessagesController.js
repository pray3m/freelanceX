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

export const getUnreadMessages = async (req, res, next) => {
  try {
    if (req.userId) {
      const messages = await prisma.messages.findMany({
        where: {
          receiverId: req.userId,
          isRead: false,
        },
        include: {
          sender: true,
        },
      });
      return res.status(200).json({ messages });
    }
    return res.status(400).send("User id is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    if (req.userId && req.params.messageId) {
      await prisma.messages.update({
        where: { id: parseInt(req.params.messageId) },
        data: { isRead: true },
      });
      return res.status(200).send("Message mark as read.");
    }
    return res.status(400).send("User id and message Id is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
