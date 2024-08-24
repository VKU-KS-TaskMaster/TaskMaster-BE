import SpaceService from "@/services/space.service";

const SpaceController = {
    get: async (req, res, next) => {
        try {
            const message = await SpaceService.get(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    getList: async (req, res, next) => {
        try {
            const message = await SpaceService.getList(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    store: async (req, res, next) => {
        try {
            const message = await SpaceService.store(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    update: async (req, res, next) => {
        try {
            const message = await SpaceService.update(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    destroy: async (req, res, next) => {
        try {
            const message = await SpaceService.destroy(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
}

export default SpaceController