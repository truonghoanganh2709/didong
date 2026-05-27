import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const buildAuthPayload = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
        data: {},
      });
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
        data: {},
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      role,
    });

    const token = generateToken(newUser._id);
    setAuthCookie(res, token);

    return res.status(201).json({
      success: true,
      message: "Register successfully",
      data: {
        token,
        user: buildAuthPayload(newUser),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Register failed",
      data: {},
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
        data: {},
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
        data: {},
      });
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
        data: {},
      });
    }

    const token = generateToken(user._id);
    setAuthCookie(res, token);

    return res.status(200).json({
      success: true,
      message: "Login successfully",
      data: {
        token,
        user: buildAuthPayload(user),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Login failed",
      data: {},
    });
  }
};

export const me = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Get profile successfully",
    data: {
      user: buildAuthPayload(req.user),
    },
  });
};
