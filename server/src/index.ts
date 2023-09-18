import express from "express";
import cors from "cors";
import { productsRouter } from "./routes/products";
import dotenv from "dotenv";
import db from "./config/db";

dotenv.config();
db();

const app = express();

app.use(cors());

app.use("/api/products", productsRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Starting app on port ${port}`));
