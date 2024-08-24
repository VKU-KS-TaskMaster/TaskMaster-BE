import TaskService from "@/services/task.service";

const TaskController = {
    get: async (req, res, next) => {
        try {
            const message = await TaskService.get(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    getList: async (req, res, next) => {
        try {
            const message = await TaskService.getList(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    store: async (req, res, next) => {
        try {
            const message = await TaskService.store(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    update: async (req, res, next) => {
        try {
            const message = await TaskService.update(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    destroy: async (req, res, next) => {
        try {
            const message = await TaskService.destroy(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
}

export default TaskController