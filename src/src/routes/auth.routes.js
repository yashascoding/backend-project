import { Router } from "express";
import { Registeruser } from "../controllers/auth.controllers.js";

const router = Router();

router.route("/register").post(Registeruser);

export default router;