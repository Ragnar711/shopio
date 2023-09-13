import express from "express";
import cors from "cors";
import { productsRouter } from "./controllers/products.js";

import dotenv from "dotenv";
dotenv.config();

// Database connection
import db from "./config/db.js";
db();

const app = express();

app.use(cors());

app.use(productsRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Starting app on port ${port}`));
