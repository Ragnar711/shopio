import mongoose from "mongoose";
import colors from "colors";

import dotenv from "dotenv";
dotenv.config();

import users from "./data/users.js";
import products from "./data/products.js";

import User from "./models/user.js";
import Product from "./models/product.js";
import Order from "./models/order.js";

import db from "./config/db.js";
db();

const importData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });
        await Product.insertMany(sampleProducts);

        console.log("Data imported successfully".green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log("Data destroyed".red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === "insert") {
    importData();
} else if (process.argv[2] === "destroy") {
    destroyData();
} else {
    console.error("Wrong arguments");
}
