import ProjectService from "@/services/project.service";

const ProjectController = {
    get: async (req, res, next) => {
        try {
            const message = await ProjectService.get(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    getList: async (req, res, next) => {
        try {
            const message = await ProjectService.getList(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    store: async (req, res, next) => {
        try {
            const message = await ProjectService.store(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    update: async (req, res, next) => {
        try {
            const message = await ProjectService.update(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    destroy: async (req, res, next) => {
        try {
            const message = await ProjectService.destroy(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
}

export default ProjectController