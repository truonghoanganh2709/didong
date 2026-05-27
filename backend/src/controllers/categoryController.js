import Category from "../models/Category.js";
import { slugify, generateUniqueSlug } from "../utils/slugify.js";

export const getCategories = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status && status !== "all") {
      filter.status = status;
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const categories = await Category.find(filter).sort({ name: 1 });

    return res.status(200).json({
      success: true,
      message: "Get categories successfully",
      data: { categories },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Get categories failed",
      data: {},
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description, image, status } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
        data: {},
      });
    }

    const slug = await generateUniqueSlug(Category, name);

    const category = await Category.create({
      name: name.trim(),
      slug,
      description: description?.trim() || "",
      image: image?.trim() || "",
      status: status || "active",
    });

    return res.status(201).json({
      success: true,
      message: "Create category successfully",
      data: { category },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
        data: {},
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Create category failed",
      data: {},
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image, status } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        data: {},
      });
    }

    if (name?.trim()) {
      category.name = name.trim();
      category.slug = await generateUniqueSlug(Category, name, id);
    }

    if (description !== undefined) {
      category.description = description?.trim() || "";
    }

    if (image !== undefined) {
      category.image = image?.trim() || "";
    }

    if (status) {
      category.status = status;
    }

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Update category successfully",
      data: { category },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Update category failed",
      data: {},
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        data: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: "Delete category successfully",
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Delete category failed",
      data: {},
    });
  }
};
