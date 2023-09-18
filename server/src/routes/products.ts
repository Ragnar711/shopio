import { Router } from "express";
import { getProducts, getProduct } from "../controller/products";

const router = Router();

// @desc Get a list of products
// @route GET /api/products
// @access public
router.get("/", getProducts);

// @desc Get a product
// @route GET /api/products/:id
// @access public
router.get("/:id", getProduct);

export { router as productsRouter };
