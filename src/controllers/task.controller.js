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
            const message = await TaskService.search(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    store: async (params, req, res, next) => {
        try {
            const message = await TaskService.store(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    update: async (params, req, res, next) => {
        try {
            const message = await TaskService.update(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    destroy: async (params, req, res, next) => {
        try {
            const message = await TaskService.destroy(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },

    updateByMember: async (params, req, res, next) => {
        try {
            const message = await TaskService.updateByMember(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },

    searchMembers: async (params, req, res, next) => {
        try {
            const message = await TaskMemberService.search(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    updateMembers: async (params, req, res, next) => {
        try {
            const message = await TaskMemberService.update(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    }
}

export default TaskController