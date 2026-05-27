import mongoose from "mongoose";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Brand from "../models/Brand.js";
import { generateUniqueSlug } from "../utils/slugify.js";

const populateOptions = [
  { path: "category", select: "name slug" },
  { path: "brand", select: "name slug" },
  { path: "createdBy", select: "name email" },
];

const buildProductFilter = async (query) => {
  const filter = {};
  const { search, category, status, brand, featured, slug } = query;

  if (slug) {
    filter.slug = slug;
    return filter;
  }

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  if (status && status !== "all") {
    if (status === "low_stock") {
      filter.stock = { $gt: 0, $lt: 10 };
      filter.status = "active";
    } else {
      filter.status = status;
    }
  }

  if (featured === "true") {
    filter.featured = true;
  }

  if (category && category !== "all") {
    if (mongoose.Types.ObjectId.isValid(category)) {
      filter.category = category;
    } else {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }
  }

  if (brand && brand !== "all") {
    if (mongoose.Types.ObjectId.isValid(brand)) {
      filter.brand = brand;
    } else {
      const brandDoc = await Brand.findOne({ slug: brand });
      if (brandDoc) {
        filter.brand = brandDoc._id;
      }
    }
  }

  return filter;
};

const validateProductPayload = (body, isUpdate = false) => {
  const errors = [];

  if (!isUpdate || body.name !== undefined) {
    if (!body.name?.trim()) {
      errors.push("Product name is required");
    }
  }

  if (!isUpdate || body.price !== undefined) {
    if (body.price === undefined || body.price === null || Number(body.price) < 0) {
      errors.push("Valid price is required");
    }
  }

  if (!isUpdate || body.category !== undefined) {
    if (!body.category) {
      errors.push("Category is required");
    }
  }

  if (!isUpdate || body.brand !== undefined) {
    if (!body.brand) {
      errors.push("Brand is required");
    }
  }

  if (body.oldPrice !== undefined && Number(body.oldPrice) < 0) {
    errors.push("Old price must be greater than or equal to 0");
  }

  if (body.discount !== undefined) {
    const discount = Number(body.discount);
    if (discount < 0 || discount > 100) {
      errors.push("Discount must be between 0 and 100");
    }
  }

  if (body.stock !== undefined && Number(body.stock) < 0) {
    errors.push("Stock must be greater than or equal to 0");
  }

  if (
    body.status &&
    !["active", "inactive", "out_of_stock"].includes(body.status)
  ) {
    errors.push("Invalid status value");
  }

  return errors;
};

export const getProducts = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const allowedSortFields = ["createdAt", "price", "name", "stock"];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";

    const filter = await buildProductFilter(req.query);
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate(populateOptions)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      message: "Get products successfully",
      data: {
        products,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit) || 1,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Get products failed",
      data: {},
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    let product;

    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id).populate(populateOptions);
    }

    if (!product) {
      product = await Product.findOne({ slug: id }).populate(populateOptions);
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        data: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: "Get product successfully",
      data: { product },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Get product failed",
      data: {},
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const errors = validateProductPayload(req.body);
    if (errors.length) {
      return res.status(400).json({
        success: false,
        message: errors.join(", "),
        data: {},
      });
    }

    const {
      name,
      description,
      price,
      oldPrice,
      discount,
      images,
      category,
      brand,
      stock,
      sku,
      specs,
      status,
      featured,
    } = req.body;

    const slug = await generateUniqueSlug(Product, name);

    const product = await Product.create({
      name: name.trim(),
      slug,
      description: description?.trim() || "",
      price: Number(price),
      oldPrice: Number(oldPrice) || 0,
      discount: Number(discount) || 0,
      images: Array.isArray(images) ? images.filter(Boolean) : [],
      category,
      brand,
      stock: Number(stock) || 0,
      sku: sku?.trim() || undefined,
      specs: Array.isArray(specs) ? specs : [],
      status: status || "active",
      featured: Boolean(featured),
      createdBy: req.user?._id,
    });

    const populatedProduct = await Product.findById(product._id).populate(
      populateOptions
    );

    return res.status(201).json({
      success: true,
      message: "Create product successfully",
      data: { product: populatedProduct },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "SKU or slug already exists",
        data: {},
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Create product failed",
      data: {},
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = validateProductPayload(req.body, true);

    if (errors.length) {
      return res.status(400).json({
        success: false,
        message: errors.join(", "),
        data: {},
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        data: {},
      });
    }

    const {
      name,
      description,
      price,
      oldPrice,
      discount,
      images,
      category,
      brand,
      stock,
      sku,
      specs,
      status,
      featured,
    } = req.body;

    if (name?.trim()) {
      product.name = name.trim();
      product.slug = await generateUniqueSlug(Product, name, id);
    }

    if (description !== undefined) {
      product.description = description?.trim() || "";
    }

    if (price !== undefined) {
      product.price = Number(price);
    }

    if (oldPrice !== undefined) {
      product.oldPrice = Number(oldPrice) || 0;
    }

    if (discount !== undefined) {
      product.discount = Number(discount) || 0;
    }

    if (images !== undefined) {
      product.images = Array.isArray(images) ? images.filter(Boolean) : [];
    }

    if (category) {
      product.category = category;
    }

    if (brand) {
      product.brand = brand;
    }

    if (stock !== undefined) {
      product.stock = Number(stock) || 0;
    }

    if (sku !== undefined) {
      product.sku = sku?.trim() || undefined;
    }

    if (specs !== undefined) {
      product.specs = Array.isArray(specs) ? specs : [];
    }

    if (status) {
      product.status = status;
    }

    if (featured !== undefined) {
      product.featured = Boolean(featured);
    }

    await product.save();

    const populatedProduct = await Product.findById(product._id).populate(
      populateOptions
    );

    return res.status(200).json({
      success: true,
      message: "Update product successfully",
      data: { product: populatedProduct },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "SKU or slug already exists",
        data: {},
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Update product failed",
      data: {},
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        data: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: "Delete product successfully",
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Delete product failed",
      data: {},
    });
  }
};
