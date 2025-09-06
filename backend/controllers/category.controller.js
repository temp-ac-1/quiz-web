// controllers/category.controller.js
import Category from "../models/Category.model.js"; 


/**
 * GET /api/categories
 * Query params:
 *   - page (default 1)
 *   - limit (default 12, max 100)
 *   - search (optional)
 *   - difficulty (optional, e.g. Beginner/Intermediate/Advanced)
 *   - sortBy (optional: popularity | rating | progress | recent)
 */
export const listCategories = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(parseInt(req.query.limit || "12", 10), 100);
    const skip = (page - 1) * limit;

    const search = (req.query.search || "").trim();
    const difficulty = req.query.difficulty;
    const sortBy = req.query.sortBy || "recent";

    const filter = {};
    if (search) {
      // Prefer text index if created, fallback to case-insensitive regex
      // If you create a text index: CategorySchema.index({ name: 'text', description: 'text' })
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    if (difficulty && difficulty !== "all") {
      filter.difficulty = difficulty;
    }

    let sort = { createdAt: -1 };
    if (sortBy === "popularity") sort = { participants: -1 };
    else if (sortBy === "rating") sort = { rating: -1 };
    else if (sortBy === "progress") sort = { overallProgress: -1 };

    // Only select fields you need to reduce payload
    const projection = "title description slug difficulty overallProgress totalQuizzes completedQuizzes participants rating pointsEarned avatar";


    const [categories, total] = await Promise.all([
      Category.find(filter)
        .select(projection)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Category.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);
    
    res.json({
      categories,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/categories/:slug
 * Returns single category (optionally populate subcollections)
 */
export const getCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug })
      .populate({
        path: "subcategories achievements",
        select: "name description slug",
      })
      .lean();

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ category });
  } catch (err) {
    next(err);
  }
};
