import express from "express";
import cors from "cors";
import { productsRouter } from "./routes/products";
import dotenv from "dotenv";
import db from "./config/db";
import { notFound, errorHandler } from "./middleware/errorMiddleware";

dotenv.config();
db();

const app = express();

app.use(cors());

app.use("/api/products", productsRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Starting app on port ${port}`));
