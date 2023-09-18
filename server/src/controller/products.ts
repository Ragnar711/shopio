import { Request, Response } from "express";
import Product from "../models/product";
import asyncHandler from "../middleware/asyncHandler";

const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find();
    res.status(200).json(products);
});

const getProduct = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
        res.status(404);
        throw new Error("Resource not found");
    }

    res.status(200).json(product);
});

export { getProducts, getProduct };
