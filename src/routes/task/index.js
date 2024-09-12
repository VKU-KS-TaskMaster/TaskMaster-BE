import express from "express";

import TaskController from "@/controllers/task.controller";
import validateRequest from "@/middlewares/validateRequest.middleware";
import { taskDestroySchema, taskGetListSchema, taskGetSchema, taskStoreSchema, taskUpdateSchema } from "@/models/task.model";

const router = express.Router();

router.get("/:key", validateRequest(taskGetSchema), TaskController.get);
router.get("/", validateRequest(taskGetListSchema), TaskController.search);
router.post("/", validateRequest(taskStoreSchema), TaskController.store);
router.put("/:key", validateRequest(taskUpdateSchema), TaskController.update);
router.delete("/:key", validateRequest(taskDestroySchema), TaskController.destroy);

router.post("/:key/update_members", TaskController.updateMembers)
router.get("/search_members", TaskController.searchMembers)

module.exports = router;
