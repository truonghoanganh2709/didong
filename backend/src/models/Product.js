import mongoose from "mongoose";

const specSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true },
    value: { type: String, trim: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be greater than or equal to 0"],
    },
    oldPrice: {
      type: Number,
      min: [0, "Old price must be greater than or equal to 0"],
      default: 0,
    },
    discount: {
      type: Number,
      min: [0, "Discount must be between 0 and 100"],
      max: [100, "Discount must be between 0 and 100"],
      default: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: [true, "Brand is required"],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock must be greater than or equal to 0"],
    },
    sku: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    specs: {
      type: [specSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "out_of_stock"],
      default: "active",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ name: "text" });

const Product = mongoose.model("Product", productSchema);

export default Product;
