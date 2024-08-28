import SpaceService from "@/services/space.service";

const SpaceController = {
    get: async (req, res, next) => {
        try {
            const message = await SpaceService.get(req.params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    search: async (req, res, next) => {
        try {
            const message = await SpaceService.search(req.query);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    store: async (req, res, next) => {
        try {
            const message = await SpaceService.store(req.body);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    update: async (req, res, next) => {
        try {
            const message = await SpaceService.update(req.params, req.body);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    destroy: async (req, res, next) => {
        try {
            const message = await SpaceService.destroy(req.params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },

    changeStatus: async (req, res, next) => {
        try {
            const message = await SpaceService.changeStatus(req.params, req.body);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
}

export default SpaceController