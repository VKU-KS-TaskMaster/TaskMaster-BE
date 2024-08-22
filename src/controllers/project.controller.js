import ProjectService from "@/services/project.service";

const UserController = {
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
    }
}

export default UserController