import express from "express";

import {
  spaceDestroySchema,
  spaceGetSchema,
  spaceSearchSchema,
  spaceStoreSchema,
  spaceUpdateSchema,
} from "@/models/space.model";
import SpaceController from "@/controllers/space.controller";
import validateRequest from "@/middlewares/validateRequest.middleware";

const router = express.Router();

router.get("/:key", validateRequest(spaceGetSchema), SpaceController.get);
router.get("/", validateRequest(spaceSearchSchema), SpaceController.search);
router.post("/", validateRequest(spaceStoreSchema), SpaceController.store);
router.put("/:key", validateRequest(spaceUpdateSchema), SpaceController.update);
router.delete(
  "/:key",
  validateRequest(spaceDestroySchema),
  SpaceController.destroy
);

module.exports = router;
