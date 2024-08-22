import express from "express";

import AuthController from "@/controllers/auth.controller";

const router = express.Router();

router.post("/sign_in", AuthController.signInDefault);
router.post("/sign_up", AuthController.signUpDefault);
router.post("/verify_sign_up", AuthController.verifySignUp);

router.post("/sign_in_google", AuthController.signInGoogle);
router.post("/sign_up_google", AuthController.signUpGoogle);

router.post("/logout", AuthController.logout);

router.post("/forgot_password", AuthController.forgotPassword);
router.post("/verify_forgot_password", AuthController.verifyForgotPassword);

module.exports = router;
