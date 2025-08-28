import { existsSync, renameSync, unlinkSync } from "fs";
import prisma from "../prisma/client.js";

export const addGig = async (req, res, next) => {
  try {
    if (req.files) {
      // Extract Cloudinary URLs from uploaded files
      const imageUrls = req.files.map((file) => file.path);

      if (req.query) {
        const {
          title,
          description,
          category,
          features,
          price,
          revisions,
          time,
          shortDesc,
        } = req.query;

        const gig = await prisma.gig.create({
          data: {
            title,
            description,
            deliveryTime: parseInt(time),
            category,
            features,
            price: parseInt(price),
            shortDesc,
            revisions: parseInt(revisions),
            createdBy: { connect: { id: req.userId } },
            images: imageUrls,
          },
        });

        return res.status(201).send("Successfuly created the gig.");
      }
    }
    return res.status(400).send("All properties are required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error.");
  }
};

export const getAllUserGigs = async (req, res, next) => {
  try {
    if (req.userId) {
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        include: { gigs: true },
      });
      return res.status(200).json({ gigs: user?.gigs ?? [] });
    }
    return res.status(400).send("UserId should be required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error.");
  }
};

export const getGigById = async (req, res, next) => {
  try {
    if (req.params.gigId) {
      const gig = await prisma.gig.findUnique({
        where: { id: req.params.gigId },
        include: {
          createdBy: true,
          reviews: {
            include: { reviewer: true },
          },
        },
      });

      const userWithGigs = await prisma.user.findUnique({
        where: { id: gig.createdBy.id },
        include: { gigs: { include: { reviews: true } } },
      });

      const gigs = userWithGigs?.gigs || [];
      const totalReviews = gigs.reduce(
        (acc, gig) => acc + (gig.reviews?.length || 0),
        0
      );

      const averageRating =
        totalReviews > 0
          ? (
              gigs.reduce(
                (acc, gig) =>
                  acc +
                  gig.reviews.reduce((sum, review) => sum + review.rating, 0),
                0
              ) / totalReviews
            ).toFixed(1)
          : "N/A";

      return res
        .status(200)
        .json({ gig: { ...gig, totalReviews, averageRating } });
    }
    return res.status(400).send("GigId is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error.");
  }
};

export const updateGig = async (req, res, next) => {
  try {
    if (req.files) {
      const imageUrls = req.files.map((file) => file.path);
      if (req.query) {
        const {
          title,
          description,
          category,
          features,
          price,
          revisions,
          time,
          shortDesc,
        } = req.query;

        const oldData = await prisma.gig.findUnique({
          where: { id: req.params.gigId },
        });

        // Delete old images from Cloudinary
        if (oldData?.images?.length > 0) {
          for (const imageUrl of oldData.images) {
            // Extract public_id from Cloudinary URL
            const publicId = imageUrl.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`freelanceX/${publicId}`);
          }
        }

        const gig = await prisma.gig.update({
          where: { id: req.params.gigId },
          data: {
            title,
            description,
            deliveryTime: parseInt(time),
            category,
            features,
            price: parseInt(price),
            shortDesc,
            revisions: parseInt(revisions),
            createdBy: { connect: { id: req.userId } },
            images: imageUrls,
          },
        });

        return res.status(200).send("Successfuly updated the gig.");
      }
    }
    return res.status(400).send("All properties are required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error.");
  }
};

export const searchGigs = async (req, res, next) => {
  try {
    if (req.query.searchTerm || req.query.category) {
      const searchTerm = req.query.searchTerm.toLowerCase();
      const category = req.query.category;
      const gigs = await prisma.gig.findMany(
        createSearchQuery(searchTerm, category)
      );

      return res.status(200).json({ gigs });
    }
    return res.status(400).send("SearchTerm or Category is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error.");
  }
};

const createSearchQuery = (searchTerm, category) => {
  const query = {
    where: {
      OR: [],
    },
    include: {
      createdBy: true,
      reviews: {
        include: {
          reviewer: true,
        },
      },
    },
  };
  if (searchTerm) {
    query.where.OR.push({
      title: { contains: searchTerm, mode: "insensitive" },
    });
  }
  if (category) {
    query.where.OR.push({
      category: { contains: category, mode: "insensitive" },
    });
  }
  return query;
};

const checkOrder = async (userId, gigId) => {
  try {
    const hasUserOrderedGig = await prisma.order.findFirst({
      where: {
        buyerId: userId,
        gigId: gigId,
        isCompleted: true,
      },
    });
    return hasUserOrderedGig;
  } catch (err) {
    console.log(err);
  }
};

export const checkGigOrder = async (req, res, next) => {
  try {
    if (req.userId && req.params.gigId) {
      const hasUserOrderedGig = await checkOrder(req.userId, req.params.gigId);
      return res
        .status(200)
        .json({ hasUserOrderedGig: hasUserOrderedGig ? true : false });
    }
    return res.status(400).send("userId and gigId is required.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const addReview = async (req, res, next) => {
  try {
    if (req.userId && req.params.gigId) {
      if (await checkOrder(req.userId, req.params.gigId)) {
        if (req.body.reviewText && req.body.rating) {
          const newReview = await prisma.reviews.create({
            data: {
              rating: parseInt(req.body.rating),
              comment: req.body.reviewText,
              reviewer: { connect: { id: req.userId } },
              gig: { connect: { id: req.params.gigId } },
            },
            include: {
              reviewer: true,
            },
          });

          return res.status(201).json({ newReview });
        }

        return res.status(400).send("ReviewText and Rating is required.");
      }
      return res.status(400).send("You have not ordered this gig.");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
