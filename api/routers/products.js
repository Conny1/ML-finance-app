import express from "express";
import { getproducts } from "../controlers/products.js";

const router = express.Router()

router.get("/products", getproducts)


export default router