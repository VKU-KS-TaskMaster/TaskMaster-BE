import express from "express";

import ProjectController from "@/controllers/project.controller";

const router = express.Router();

router.post("/store", ProjectController.store);
router.post("/update", ProjectController.update);

module.exports = router;
