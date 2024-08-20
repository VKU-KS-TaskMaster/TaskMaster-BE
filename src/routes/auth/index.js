import express from "express";
import AuthController from "../../controllers/auth.controller";

const router = express.Router();

router.post("/create", AuthController.create);
router.post("/sign_in", AuthController.signIn);

module.exports = router;
