import SpaceController from "@/controllers/space.controller";
import express from "express";

const router = express.Router();

router.get("/:key", SpaceController.get);
router.get("/", SpaceController.search);
router.post("/", SpaceController.store);
router.put("/:key", SpaceController.update);
router.delete("/:key", SpaceController.destroy);

module.exports = router;
