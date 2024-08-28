import ProjectService from "@/services/project.service";

const ProjectController = {
    get: async (req, res, next) => {
        try {
            const message = await ProjectService.get(req.params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    search: async (req, res, next) => {
        try {
            const message = await ProjectService.search(req.query);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    store: async (req, res, next) => {
        try {
            const message = await ProjectService.store(req.body);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    update: async (req, res, next) => {
        try {
            const message = await ProjectService.update(req.params, req.body);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    destroy: async (req, res, next) => {
        try {
            const message = await ProjectService.destroy(req.params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    
    changeStatus: async (req, res, next) => {
        try {
            const message = await ProjectService.changeStatus(req.params, req.body);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    searchMembers: async (req, res, next) => {
        try {
            const message = await ProjectService.searchMembers(req.query);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
}

export default ProjectController