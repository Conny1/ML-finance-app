import express from "express";
import { getTransactions } from "../controlers/transactions.js";

const router = express.Router()

router.get("/transactions", getTransactions)


export default router