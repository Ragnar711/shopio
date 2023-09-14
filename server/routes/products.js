import { Router } from "express";
import Product from "../models/product.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = Router();

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const products = await Product.find();
        res.status(200).json(products);
    })
);

router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const product = await Product.findById(id);

        if (!product)
            return res.status(404).json({ message: "Product not found" });

        res.status(200).json(product);
    })
);

export { router as productsRouter };
