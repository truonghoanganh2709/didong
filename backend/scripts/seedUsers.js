import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../src/config/db.js";
import User from "../src/models/User.js";

dotenv.config();

const sampleUsers = [
  {
    name: "Admin Di Dong Viet",
    email: "admin@didongviet.local",
    password: "123456",
    role: "admin",
  },
  {
    name: "Sales Demo",
    email: "sales@didongviet.local",
    password: "123456",
    role: "sales",
  },
  {
    name: "Warehouse Demo",
    email: "warehouse@didongviet.local",
    password: "123456",
    role: "warehouse",
  },
  {
    name: "Accounting Demo",
    email: "accounting@didongviet.local",
    password: "123456",
    role: "accounting",
  },
  {
    name: "Customer Demo",
    email: "customer@didongviet.local",
    password: "123456",
    role: "customer",
  },
];

const seedUsers = async () => {
  try {
    await connectDB();

    const emails = sampleUsers.map((user) => user.email);
    await User.deleteMany({ email: { $in: emails } });
    for (const user of sampleUsers) {
      await User.create(user);
    }

    console.log("Seed users completed successfully");
    sampleUsers.forEach((user) => {
      console.log(`- ${user.role}: ${user.email} / ${user.password}`);
    });
  } catch (error) {
    console.error("Seed users failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedUsers();
