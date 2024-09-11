import express from "express";

import ProjectController from "@/controllers/project.controller";

const router = express.Router();

router.get("/:key", ProjectController.get);
router.get("/", ProjectController.search);
router.post("/", ProjectController.store);
router.put("/:key", ProjectController.update);
router.delete("/:key", ProjectController.destroy);

router.post("/:key/update_members", ProjectController.updateMembers)
router.get("/search_members", ProjectController.searchMembers)

module.exports = router;
