import UserInfoService from "@/services/userInfo.service";

const UserInfoController = {
    get: async (params, req, res, next) => {
        try {
            const message = await UserInfoService.get(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    search: async (params, req, res, next) => {
        try {
            const message = await UserInfoService.search(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    store: async (params, req, res, next) => {
        try {
            const message = await UserInfoService.store(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    update: async (params, req, res, next) => {
        try {
            const message = await UserInfoService.update(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    destroy: async (params, req, res, next) => {
        try {
            const message = await UserInfoService.destroy(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    }
}

export default UserInfoController