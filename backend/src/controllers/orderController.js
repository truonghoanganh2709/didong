import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const populateOptions = [
  { path: "user", select: "name email role" },
  { path: "items.product", select: "name slug images price" },
];

const canUpdateOrderStatus = (role, status) => {
  if (role === "admin") return true;
  if (role === "sales") return ["confirmed", "cancelled"].includes(status);
  if (role === "warehouse") return ["packing", "shipping"].includes(status);
  return false;
};

const canUpdatePaymentStatus = (role) => {
  return role === "admin" || role === "accounting";
};

const allowedOrderStatuses = [
  "pending",
  "confirmed",
  "packing",
  "shipping",
  "completed",
  "cancelled",
];

const allowedPaymentStatuses = ["unpaid", "paid", "cod_pending"];

export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentStatus } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items are required",
        data: {},
      });
    }

    if (
      !shippingAddress?.fullName ||
      !shippingAddress?.phone ||
      !shippingAddress?.address
    ) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required",
        data: {},
      });
    }

    let totalPrice = 0;
    const normalizedItems = [];

    for (const item of items) {
      if (!mongoose.Types.ObjectId.isValid(item.product)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product id",
          data: {},
        });
      }

      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
          data: {},
        });
      }

      const quantity = Math.max(1, Number(item.quantity) || 1);
      const linePrice = Number(product.price) * quantity;

      normalizedItems.push({
        product: product._id,
        name: product.name,
        price: Number(product.price),
        quantity,
        image: product.images?.[0] || "",
      });
      totalPrice += linePrice;
    }

    const order = await Order.create({
      user: req.user._id,
      items: normalizedItems,
      totalPrice,
      shippingAddress: {
        fullName: shippingAddress.fullName.trim(),
        phone: shippingAddress.phone.trim(),
        address: shippingAddress.address.trim(),
        note: shippingAddress.note?.trim() || "",
      },
      orderStatus: "pending",
      paymentStatus: paymentStatus || "cod_pending",
    });

    const populatedOrder = await Order.findById(order._id).populate(populateOptions);

    return res.status(201).json({
      success: true,
      message: "Create order successfully",
      data: { order: populatedOrder },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Create order failed",
      data: {},
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const role = req.user?.role;
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
    const skip = (page - 1) * limit;
    const { status, paymentStatus, search } = req.query;
    const filter = {};

    if (role === "customer") {
      filter.user = req.user._id;
    }

    if (status && status !== "all") {
      filter.orderStatus = status;
    }

    if (paymentStatus && paymentStatus !== "all") {
      filter.paymentStatus = paymentStatus;
    }

    if (search) {
      filter.$or = [
        { "shippingAddress.fullName": { $regex: search, $options: "i" } },
        { "shippingAddress.phone": { $regex: search, $options: "i" } },
      ];
    }

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate(populateOptions)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      message: "Get orders successfully",
      data: {
        orders,
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
      message: error.message || "Get orders failed",
      data: {},
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = req.user?.role;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order id",
        data: {},
      });
    }

    const order = await Order.findById(id).populate(populateOptions);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
        data: {},
      });
    }

    if (role === "customer" && String(order.user?._id) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
        data: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: "Get order successfully",
      data: { order },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Get order failed",
      data: {},
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const role = req.user?.role;

    if (!orderStatus) {
      return res.status(400).json({
        success: false,
        message: "Order status is required",
        data: {},
      });
    }

    if (!allowedOrderStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
        data: {},
      });
    }

    if (!canUpdateOrderStatus(role, orderStatus)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
        data: {},
      });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
        data: {},
      });
    }

    order.orderStatus = orderStatus;
    await order.save();

    const populatedOrder = await Order.findById(order._id).populate(populateOptions);

    return res.status(200).json({
      success: true,
      message: "Update order status successfully",
      data: { order: populatedOrder },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Update order status failed",
      data: {},
    });
  }
};

export const updateOrderPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;
    const role = req.user?.role;

    if (!paymentStatus) {
      return res.status(400).json({
        success: false,
        message: "Payment status is required",
        data: {},
      });
    }

    if (!allowedPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status",
        data: {},
      });
    }

    if (!canUpdatePaymentStatus(role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
        data: {},
      });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
        data: {},
      });
    }

    order.paymentStatus = paymentStatus;
    await order.save();

    const populatedOrder = await Order.findById(order._id).populate(populateOptions);

    return res.status(200).json({
      success: true,
      message: "Update order payment successfully",
      data: { order: populatedOrder },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Update order payment failed",
      data: {},
    });
  }
};
