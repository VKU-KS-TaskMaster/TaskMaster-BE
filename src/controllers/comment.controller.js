import CommentService from "@/services/comment.service";

const CommentController = {
    search: async (params, req, res, next) => {
        try {
            const message = await CommentService.search(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    store: async (params, req, res, next) => {
        try {
            const message = await CommentService.store(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    update: async (params, req, res, next) => {
        try {
            const message = await CommentService.update(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    destroy: async (params, req, res, next) => {
        try {
            const message = await CommentService.destroy(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    }
}

export default CommentController