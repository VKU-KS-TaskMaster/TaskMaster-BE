import SpaceController from "@/controllers/space.controller";
import express from "express";

const router = express.Router();

router.get("/get", SpaceController.get);
router.get("/getList", SpaceController.getList);
router.post("/store", SpaceController.store);
router.post("/update", SpaceController.update)
router.post("/destroy", SpaceController.destroy);

module.exports = router;
