import { Router } from "express";
import { fetchNews } from "../controllers/news.controller.js";

const router = Router();
router.get("/", fetchNews);

export default router;
