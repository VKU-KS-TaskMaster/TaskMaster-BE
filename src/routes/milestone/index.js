import express from "express";

import MilestoneController from "@/controllers/milestone.controller";

const router = express.Router();

router.get("/:key", MilestoneController.get);
router.get("/", MilestoneController.search);
router.post("/", MilestoneController.store);
router.put("/:key", MilestoneController.update);
router.delete("/:key", MilestoneController.destroy);

router.post("/change_status/:key", MilestoneController.changeStatus)
router.post("/change_due_date/:key", MilestoneController.changeDueDate)
router.post("/search_members/", MilestoneController.searchMembers)

module.exports = router;
