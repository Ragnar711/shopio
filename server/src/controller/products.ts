import { Request, Response } from "express";
import Product from "../models/product";
import asyncHandler from "../middleware/asyncHandler";
import { createClient } from "redis";

const redisClient = createClient();

const connectToRedis = async () => {
    await redisClient.connect();
};

const disconnectFromRedis = async () => {
    await redisClient.disconnect();
};

const getFromRedis = async (key: string) => {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
};

const setInRedis = async (key: string, data: any) => {
    await redisClient.set(key, JSON.stringify(data));
};

const getProducts = asyncHandler(async (req: Request, res: Response) => {
    try {
        await connectToRedis();
        const products = await getFromRedis("products");

        if (products !== null) {
            return res.json(products);
        }

        const productsFromDb = await Product.find();
        await setInRedis("products", productsFromDb);
        res.status(200).json(productsFromDb);
    } finally {
        await disconnectFromRedis();
    }
});

const getProduct = asyncHandler(async (req: Request, res: Response) => {
    try {
        await connectToRedis();
        const id = req.params.id;
        const product = await getFromRedis(`product_${id}`);

        if (product !== null) {
            return res.json(product);
        }

        const productFromDb = await Product.findById(id);

        if (!productFromDb) {
            res.status(404);
            throw new Error("Resource not found");
        }

        await setInRedis(`product_${id}`, productFromDb);
        res.status(200).json(productFromDb);
    } finally {
        await disconnectFromRedis();
    }
});

export { getProducts, getProduct };
