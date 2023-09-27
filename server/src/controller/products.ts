import { Request, Response } from "express";
import Product from "../models/product";
import asyncHandler from "../middleware/asyncHandler";

// Get all products
const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const productsFromDb = await Product.find();
    res.status(200).json(productsFromDb);
});

// Get a single product by ID
const getProduct = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const productFromDb = await Product.findById(id);

    if (!productFromDb) {
        res.status(404).json({
            success: false,
            error: "Resource not found",
        });
        return;
    }

    res.status(200).json(productFromDb);
});

export { getProducts, getProduct };
