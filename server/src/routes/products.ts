import { Router, Request, Response } from "express";
import Product from "../models/product";
import asyncHandler from "../middleware/asyncHandler";

const router = Router();

router.get(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const products = await Product.find();
        res.status(200).json(products);
    })
);

router.get(
    "/:id",
    asyncHandler(async (req: Request, res: Response) => {
        const id = req.params.id;
        const product = await Product.findById(id);

        if (!product)
            return res.status(404).json({ message: "Product not found" });

        res.status(200).json(product);
    })
);

export { router as productsRouter };
