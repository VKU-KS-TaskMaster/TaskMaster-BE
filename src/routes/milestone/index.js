import express from "express";

import MilestoneController from "@/controllers/milestone.controller";
import {
  milestoneDestroySchema,
  milestoneGetSchema,
  milestoneSearchMembersSchema,
  milestoneSearchSchema,
  milestoneStoreSchema,
  milestoneUpdateMembersSchema,
  milestoneUpdateSchema,
} from "@/models/milestone.model";

const router = express.Router();

router.get(
  "/:key",
  validateRequest(milestoneGetSchema),
  MilestoneController.get
);
router.get(
  "/",
  validateRequest(milestoneSearchSchema),
  MilestoneController.search
);
router.post(
  "/",
  validateRequest(milestoneStoreSchema),
  MilestoneController.store
);
router.put(
  "/:key",
  validateRequest(milestoneUpdateSchema),
  MilestoneController.update
);
router.delete(
  "/:key",
  validateRequest(milestoneDestroySchema),
  MilestoneController.destroy
);

router.post(
  "/:key/update_members",
  validateRequest(milestoneUpdateMembersSchema),
  MilestoneController.updateMembers
);
router.get(
  "/:key/search_members",
  validateRequest(milestoneSearchMembersSchema),
  MilestoneController.searchMembers
);

module.exports = router;
