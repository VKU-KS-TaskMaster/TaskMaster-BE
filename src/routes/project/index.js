import express from "express";

import ProjectController from "@/controllers/project.controller";
import validateRequest from "@/middlewares/validateRequest.middleware";
import {
  projectAddTeamSchema,
  projectDestroySchema,
  projectGetSchema,
  projectRemoveTeamSchema,
  projectSearchMembersSchema,
  projectSearchSchema,
  projectStoreSchema,
  projectUpdateMembersSchema,
  projectUpdateSchema,
} from "@/models/project.model";

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

// Team
router.post(
  "/:key/add_team",
  validateRequest(projectAddTeamSchema),
  ProjectController.addTeam
);

router.post(
  "/:key/remove_team",
  validateRequest(projectRemoveTeamSchema),
  ProjectController.removeTeam
);

module.exports = router;
