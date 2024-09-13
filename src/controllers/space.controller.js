import SpaceService from "@/services/space.service";

const SpaceController = {
    get: async (params, req, res, next) => {
        try {
            const message = await SpaceService.get(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    search: async (params, req, res, next) => {
        try {
            const message = await SpaceService.search(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    store: async (params, req, res, next) => {
        try {
            const message = await SpaceService.store(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    update: async (params, req, res, next) => {
        try {
            const message = await SpaceService.update(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    destroy: async (params, req, res, next) => {
        try {
            const message = await SpaceService.destroy(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    }
}

export default SpaceController