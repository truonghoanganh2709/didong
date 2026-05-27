import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../src/config/db.js";
import Category from "../src/models/Category.js";
import Brand from "../src/models/Brand.js";
import Product from "../src/models/Product.js";
import User from "../src/models/User.js";
import { slugify } from "../src/utils/slugify.js";

dotenv.config();

const categories = [
  {
    name: "Điện thoại iPhone",
    slug: "dien-thoai-iphone",
    description: "iPhone chính hãng Apple",
    image: "/placeholder.svg?height=200&width=200",
    status: "active",
  },
  {
    name: "Điện thoại Samsung",
    slug: "dien-thoai-samsung",
    description: "Samsung Galaxy chính hãng",
    image: "/placeholder.svg?height=200&width=200",
    status: "active",
  },
  {
    name: "Điện thoại Xiaomi",
    slug: "dien-thoai-xiaomi",
    description: "Xiaomi chính hãng",
    image: "/placeholder.svg?height=200&width=200",
    status: "active",
  },
  {
    name: "Điện thoại OPPO",
    slug: "dien-thoai-oppo",
    description: "OPPO chính hãng",
    image: "/placeholder.svg?height=200&width=200",
    status: "active",
  },
  {
    name: "Tablet & Phụ kiện",
    slug: "tablet-phu-kien",
    description: "Tablet và phụ kiện công nghệ",
    image: "/placeholder.svg?height=200&width=200",
    status: "active",
  },
];

const brands = [
  { name: "Apple", slug: "apple" },
  { name: "Samsung", slug: "samsung" },
  { name: "Xiaomi", slug: "xiaomi" },
  { name: "Oppo", slug: "oppo" },
];

const products = [
  {
    name: "iPhone 15 Pro Max 256GB Chính Hãng",
    price: 34990000,
    oldPrice: 36990000,
    discount: 5,
    stock: 45,
    sku: "IP15PM256",
    brandSlug: "apple",
    categorySlug: "dien-thoai-iphone",
    featured: true,
    specs: [
      { label: "Màn hình", value: "6.7 inch Super Retina XDR" },
      { label: "Chip", value: "A17 Pro" },
      { label: "RAM", value: "8GB" },
      { label: "Bộ nhớ", value: "256GB" },
    ],
  },
  {
    name: "iPhone 15 128GB Chính Hãng",
    price: 22990000,
    oldPrice: 24990000,
    discount: 8,
    stock: 58,
    sku: "IP15128",
    brandSlug: "apple",
    categorySlug: "dien-thoai-iphone",
    featured: true,
    specs: [
      { label: "Màn hình", value: "6.1 inch Super Retina XDR" },
      { label: "Chip", value: "A16 Bionic" },
      { label: "Bộ nhớ", value: "128GB" },
    ],
  },
  {
    name: "Samsung Galaxy S24 Ultra 256GB",
    price: 31990000,
    oldPrice: 33990000,
    discount: 6,
    stock: 32,
    sku: "SSS24U256",
    brandSlug: "samsung",
    categorySlug: "dien-thoai-samsung",
    featured: true,
    specs: [
      { label: "Màn hình", value: "6.8 inch Dynamic AMOLED 2X" },
      { label: "Chip", value: "Snapdragon 8 Gen 3" },
      { label: "Bộ nhớ", value: "256GB" },
    ],
  },
  {
    name: "Samsung Galaxy Z Fold 5 512GB",
    price: 41990000,
    oldPrice: 44990000,
    discount: 7,
    stock: 12,
    sku: "SSZF5512",
    brandSlug: "samsung",
    categorySlug: "dien-thoai-samsung",
    featured: false,
    specs: [
      { label: "Màn hình", value: "7.6 inch Foldable AMOLED" },
      { label: "Chip", value: "Snapdragon 8 Gen 2" },
      { label: "Bộ nhớ", value: "512GB" },
    ],
  },
  {
    name: "Samsung Galaxy A55 5G 128GB",
    price: 10990000,
    oldPrice: 11990000,
    discount: 8,
    stock: 120,
    sku: "SSA55128",
    brandSlug: "samsung",
    categorySlug: "dien-thoai-samsung",
    featured: false,
    specs: [
      { label: "Màn hình", value: "6.6 inch Super AMOLED" },
      { label: "Chip", value: "Exynos 1480" },
      { label: "Bộ nhớ", value: "128GB" },
    ],
  },
  {
    name: "Xiaomi 14 Ultra 512GB",
    price: 23990000,
    oldPrice: 25990000,
    discount: 8,
    stock: 0,
    sku: "XM14U512",
    brandSlug: "xiaomi",
    categorySlug: "dien-thoai-xiaomi",
    featured: false,
    status: "out_of_stock",
    specs: [
      { label: "Màn hình", value: "6.73 inch LTPO AMOLED" },
      { label: "Chip", value: "Snapdragon 8 Gen 3" },
      { label: "Bộ nhớ", value: "512GB" },
    ],
  },
  {
    name: "Xiaomi Redmi Note 13 Pro 256GB",
    price: 7990000,
    oldPrice: 8990000,
    discount: 11,
    stock: 85,
    sku: "XMRN13P256",
    brandSlug: "xiaomi",
    categorySlug: "dien-thoai-xiaomi",
    featured: true,
    specs: [
      { label: "Màn hình", value: "6.67 inch AMOLED 120Hz" },
      { label: "Chip", value: "Snapdragon 7s Gen 2" },
      { label: "Bộ nhớ", value: "256GB" },
    ],
  },
  {
    name: "OPPO Find X7 Ultra 256GB",
    price: 24990000,
    oldPrice: 26990000,
    discount: 7,
    stock: 8,
    sku: "OPFX7U256",
    brandSlug: "oppo",
    categorySlug: "dien-thoai-oppo",
    featured: false,
    specs: [
      { label: "Màn hình", value: "6.82 inch LTPO AMOLED" },
      { label: "Chip", value: "Snapdragon 8 Gen 3" },
      { label: "Bộ nhớ", value: "256GB" },
    ],
  },
  {
    name: "OPPO Reno 11 Pro 256GB",
    price: 12990000,
    oldPrice: 13990000,
    discount: 7,
    stock: 35,
    sku: "OPR11P256",
    brandSlug: "oppo",
    categorySlug: "dien-thoai-oppo",
    featured: false,
    specs: [
      { label: "Màn hình", value: "6.7 inch AMOLED 120Hz" },
      { label: "Chip", value: "MediaTek Dimensity 8200" },
      { label: "Bộ nhớ", value: "256GB" },
    ],
  },
  {
    name: "iPhone 14 Pro 128GB Chính Hãng",
    price: 24990000,
    oldPrice: 26990000,
    discount: 7,
    stock: 25,
    sku: "IP14P128",
    brandSlug: "apple",
    categorySlug: "dien-thoai-iphone",
    featured: false,
    specs: [
      { label: "Màn hình", value: "6.1 inch Super Retina XDR" },
      { label: "Chip", value: "A16 Bionic" },
      { label: "Bộ nhớ", value: "128GB" },
    ],
  },
];

const seed = async () => {
  try {
    await connectDB();

    const adminUser = await User.findOne({ role: "admin" });

    await Product.deleteMany({});
    await Category.deleteMany({});
    await Brand.deleteMany({});

    const createdCategories = await Category.insertMany(categories);
    const createdBrands = await Brand.insertMany(brands);

    const categoryMap = Object.fromEntries(
      createdCategories.map((item) => [item.slug, item._id])
    );
    const brandMap = Object.fromEntries(
      createdBrands.map((item) => [item.slug, item._id])
    );

    const productDocs = products.map((item) => ({
      name: item.name,
      slug: slugify(item.name),
      description: `${item.name} - Sản phẩm chính hãng, bảo hành 12 tháng tại Di Động Việt.`,
      price: item.price,
      oldPrice: item.oldPrice,
      discount: item.discount,
      images: [
        "/placeholder.svg?height=500&width=500",
        "/placeholder.svg?height=500&width=500",
      ],
      category: categoryMap[item.categorySlug],
      brand: brandMap[item.brandSlug],
      stock: item.stock,
      sku: item.sku,
      specs: item.specs,
      status: item.status || (item.stock === 0 ? "out_of_stock" : "active"),
      featured: item.featured,
      createdBy: adminUser?._id,
    }));

    await Product.insertMany(productDocs);

    console.log("Seed completed successfully");
    console.log(`- Categories: ${createdCategories.length}`);
    console.log(`- Brands: ${createdBrands.length}`);
    console.log(`- Products: ${productDocs.length}`);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seed();
