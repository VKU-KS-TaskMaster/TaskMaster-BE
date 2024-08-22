import express from "express";

import UserInfoController from "@/controllers/userInfo.controller";

const router = express.Router();

router.get("/getList", UserInfoController.getList);
router.get("/get", UserInfoController.get);
router.post("/store", UserInfoController.store);
router.post("/update", UserInfoController.update)
router.post("/update_status", UserInfoController.updateStatus);
router.post("/destroy", UserInfoController.destroy);

module.exports = router;
