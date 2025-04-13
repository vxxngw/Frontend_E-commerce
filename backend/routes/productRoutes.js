import express from "express";
import { insertManyProducts } from "../controllers/productController.js";

const router = express.Router();

router.post("/bulk-add", insertManyProducts);

export default router;
