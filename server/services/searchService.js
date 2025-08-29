import Fuse from "fuse.js";
import prisma from "../prisma/client.js";
import { searchLog, dbLog } from "../utils/logger.js";

class SearchService {
  constructor() {
    this.fuseConfig = {
      includeScore: true,
      threshold: 0.4, // 0 = exact, 1 = match anything
      keys: [
        { name: "title", weight: 0.5 },
        { name: "description", weight: 0.2 },
        { name: "shortDesc", weight: 0.2 },
        { name: "featuresString", weight: 0.1 },
      ],
    };
  }

  async fuzzySearch(searchTerm, category) {
    const whereClause = { AND: [] };

    if (category) {
      whereClause.AND.push({
        category: { contains: category, mode: "insensitive" },
      });
    }

    if (searchTerm) {
      const words = searchTerm
        .toLowerCase()
        .split(" ")
        .filter((w) => w.length > 1);
      whereClause.AND.push({
        OR: [
          { title: { contains: searchTerm, mode: "insensitive" } },
          { description: { contains: searchTerm, mode: "insensitive" } },
          { features: { hasSome: words } },
          ...words.map((word) => ({
            title: { contains: word, mode: "insensitive" },
          })),
        ],
      });
    }

    const dbResults = await prisma.gig.findMany({
      where: whereClause.AND.length > 0 ? whereClause : {},
      include: {
        createdBy: true,
        reviews: { include: { reviewer: true } },
      },
      take: 100, // Limit for performance
    });

    dbLog(`Found ${dbResults.length} gigs from database`);

    if (!searchTerm) return dbResults;

    const searchableGigs = dbResults.map((gig) => ({
      ...gig,
      featuresString: Array.isArray(gig.features) ? gig.features.join(" ") : "",
    }));

    const fuse = new Fuse(searchableGigs, this.fuseConfig);
    const fuzzyResults = fuse.search(searchTerm);

    // Enhanced ranking with multiple factors
    const rankedResults = fuzzyResults.map((result) => {
      const gig = result.item;
      const fuzzyScore = (1 - result.score) * 50; // Base fuzzy score (max 50)
      const titleScore = this.getTitleMatchScore(gig.title, searchTerm);
      const featureScore = this.getFeatureMatchScore(gig.features, searchTerm);
      const qualityScore = this.calculateQualityScore(gig);

      // Weighted total score
      const totalScore = titleScore + featureScore + qualityScore + fuzzyScore;

      searchLog(
        `"${gig.title.substring(
          0,
          30
        )}..." - Title: ${titleScore}, Features: ${featureScore}, Quality: ${qualityScore}, Total: ${Math.round(
          totalScore
        )}`
      );

      return {
        ...gig,
        relevanceScore: Math.round(totalScore),
      };
    });

    // Sort by relevance score (highest first)
    const sortedResults = rankedResults.sort(
      (a, b) => b.relevanceScore - a.relevanceScore
    );

    searchLog(
      `🏆 Search completed: ${sortedResults.length} results for "${searchTerm}"`
    );
    sortedResults.slice(0, 3).forEach((gig, index) => {
      searchLog(
        `  ${index + 1}. "${gig.title.substring(0, 40)}..." - Score: ${
          gig.relevanceScore
        }`
      );
    });

    return sortedResults;
  }

  // Title match scoring (most important)
  getTitleMatchScore(title, searchTerm) {
    if (!title || !searchTerm) return 0;

    const titleLower = title.toLowerCase();
    const searchLower = searchTerm.toLowerCase();

    // Exact match in title = 100 points
    if (titleLower.includes(searchLower)) {
      return 100;
    }

    // Word matches = 30 points each
    const words = searchLower.split(" ").filter((w) => w.length > 1);
    let wordScore = 0;
    words.forEach((word) => {
      if (titleLower.includes(word)) {
        wordScore += 30;
      }
    });

    return wordScore;
  }

  // Feature match scoring
  getFeatureMatchScore(features, searchTerm) {
    if (!features || !Array.isArray(features) || !searchTerm) return 0;

    const searchLower = searchTerm.toLowerCase();
    const words = searchLower.split(" ").filter((w) => w.length > 1);

    let score = 0;

    features.forEach((feature) => {
      const featureLower = feature.toLowerCase();

      // Exact phrase in feature = 50 points
      if (featureLower.includes(searchLower)) {
        score += 50;
      }

      // Individual word matches = 20 points each
      words.forEach((word) => {
        if (featureLower.includes(word)) {
          score += 20;
        }
      });
    });

    return score;
  }

  // Quality scoring based on reviews and recency
  calculateQualityScore(gig) {
    let score = 0;

    // Rating score (0-25 points)
    if (gig.reviews && gig.reviews.length > 0) {
      const avgRating =
        gig.reviews.reduce((sum, review) => sum + review.rating, 0) /
        gig.reviews.length;
      score += avgRating * 5; // 5 stars = 25 points
    }

    // Review count bonus (0-15 points)
    const reviewCount = gig.reviews?.length || 0;
    score += Math.min(reviewCount * 1.5, 15);

    // Recency bonus (0-10 points)
    const daysSinceCreation =
      (new Date() - new Date(gig.createdAt)) / (1000 * 60 * 60 * 24);
    if (daysSinceCreation < 30) {
      score += 10;
    } else if (daysSinceCreation < 90) {
      score += 5;
    }

    return score;
  }
}

export default new SearchService();
