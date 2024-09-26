import express from "express";

import {
  taskDestroySchema,
  taskSearchSchema,
  taskGetSchema,
  taskSearchMembersSchema,
  taskStoreSchema,
  taskUpdateMembersSchema,
  taskUpdateSchema,
  taskUpdateByMemberSchema,
} from "@/models/task.model";
import TaskController from "@/controllers/task.controller";
import validateRequest from "@/middlewares/validateRequest.middleware";

const router = express.Router();

router.get("/:key", validateRequest(taskGetSchema), TaskController.get);
router.get("/", validateRequest(taskSearchSchema), TaskController.search);
router.post("/", validateRequest(taskStoreSchema), TaskController.store);
router.put("/:key", validateRequest(taskUpdateSchema), TaskController.update);
router.delete(
  "/:key",
  validateRequest(taskDestroySchema),
  TaskController.destroy
);

router.post(
  "/:key/update_by_member",
  validateRequest(taskUpdateByMemberSchema),
  TaskController.updateByMember
);

router.get(
  "/search_members",
  validateRequest(taskSearchMembersSchema),
  TaskController.searchMembers
);
router.post(
  "/:key/update_members",
  validateRequest(taskUpdateMembersSchema),
  TaskController.updateMembers
);

module.exports = router;
