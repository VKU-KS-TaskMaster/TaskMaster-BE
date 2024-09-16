import express from "express";

import {
  commentDestroySchema,
  commentSearchSchema,
  commentStoreSchema,
  commentUpdateSchema
} from "@/models/comment.model";
import CommentController from "@/controllers/comment.controller";
import validateRequest from "@/middlewares/validateRequest.middleware";

const router = express.Router();

router.get(
  "/",
  validateRequest(commentSearchSchema),
  CommentController.search
);
router.post(
  "/",
  validateRequest(commentStoreSchema),
  CommentController.store
);
router.put(
  "/:key",
  validateRequest(commentUpdateSchema),
  CommentController.update
);
router.delete(
  "/:key",
  validateRequest(commentDestroySchema),
  CommentController.destroy
);

module.exports = router;
