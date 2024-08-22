import UserInfoService from "@/services/userInfo.service";

const UserInfoController = {
    get: async (req, res, next) => {
        try {
            const message = await UserInfoService.get(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    getList: async (req, res, next) => {
        try {
            const message = await UserInfoService.getList(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    store: async (req, res, next) => {
        try {
            const message = await UserInfoService.store(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    update: async (req, res, next) => {
        try {
            const message = await UserInfoService.update(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    updateStatus: async (req, res, next) => {
        try {
            const message = await UserInfoService.updateStatus(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    destroy: async (req, res, next) => {
        try {
            const message = await UserInfoService.destroy(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    }
}

export default UserInfoController