import express from "express";

import {
    userInfoDestroySchema,
    userInfoGetSchema,
    userInfoSearchSchema,
    userInfoStoreSchema,
    userInfoUpdateSchema,
  } from "@/models/userInfo.model";
import UserInfoController from "@/controllers/userInfo.controller";
import validateRequest from "@/middlewares/validateRequest.middleware";

const router = express.Router();

router.get("/get", validateRequest(userInfoGetSchema), UserInfoController.get);
router.get(
  "/search",
  validateRequest(userInfoSearchSchema),
  UserInfoController.search
);
router.post(
  "/",
  validateRequest(userInfoStoreSchema),
  UserInfoController.store
);
router.put(
  "/",
  validateRequest(userInfoUpdateSchema),
  UserInfoController.update
);
router.delete(
  "/:key",
  validateRequest(userInfoDestroySchema),
  UserInfoController.destroy
);

module.exports = router;
