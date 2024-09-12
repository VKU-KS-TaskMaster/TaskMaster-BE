import TaskService from "@/services/task.service";
import { taskGetSchema } from "@/models/task.model";
import { TaskMemberService } from "@/services/task.service";

const TaskController = {
    get: async (params, req, res, next) => {
        try {
            const resData = await TaskService.get(params);
            return res.json(resData);
        } catch (errors) {
            next(errors);
        }
    },
    search: async (params, req, res, next) => {
        try {
            const message = await TaskService.search(req.query);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    store: async (params, req, res, next) => {
        try {
            const message = await TaskService.store(req.body);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    update: async (params, req, res, next) => {
        try {
            const message = await TaskService.update(req.params, req.body);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    destroy: async (params, req, res, next) => {
        try {
            const message = await TaskService.destroy(req.params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },

    updateMembers: async (params, req, res, next) => {
        try {
            const message = await TaskMemberService.update(req.params, req.body);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    searchMembers: async (params, req, res, next) => {
        try {
            const message = await TaskMemberService.search(req.query);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    }
}

export default TaskController