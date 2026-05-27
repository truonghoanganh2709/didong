import Brand from "../models/Brand.js";

export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find().sort({ name: 1 });

    return res.status(200).json({
      success: true,
      message: "Get brands successfully",
      data: { brands },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Get brands failed",
      data: {},
    });
  }
};
