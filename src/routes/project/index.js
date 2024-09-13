import express from "express";

import {
  projectSearchSchema,
  projectGetSchema,
  projectStoreSchema,
  projectUpdateSchema,
  projectDestroySchema,
  projectUpdateMembersSchema,
  projectSearchMembersSchema,
} from "@/models/project.model";
import ProjectController from "@/controllers/project.controller";
import validateRequest from "@/middlewares/validateRequest.middleware";

const router = express.Router();

router.get("/:key", validateRequest(projectGetSchema), ProjectController.get);
router.get("/", validateRequest(projectSearchSchema), ProjectController.search);
router.post("/", validateRequest(projectStoreSchema), ProjectController.store);
router.put(
  "/:key",
  validateRequest(projectUpdateSchema),
  ProjectController.update
);
router.delete(
  "/:key",
  validateRequest(projectDestroySchema),
  ProjectController.destroy
);

router.get(
  "/:key/search_members",
  validateRequest(projectSearchMembersSchema),
  ProjectController.searchMembers
);
router.post(
  "/:key/update_members",
  validateRequest(projectUpdateMembersSchema),
  ProjectController.updateMembers
);

module.exports = router;
