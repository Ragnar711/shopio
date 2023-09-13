import { Router } from "express";
import products from "../data/products.js";

const router = Router();

router.get("/api/products/:id", (req, res) => {
    const id = req.params.id;
    const product = products.find((product) => product._id === id);
    res.send(product);
});

router.get("/api/products", (req, res) => {
    res.send(products);
});

export { router as productsRouter };
