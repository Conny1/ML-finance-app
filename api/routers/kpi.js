import express from "express";
import { getKpi } from "../controlers/kpi.js";

const router = express.Router()

router.get("/kpis", getKpi)


export default router