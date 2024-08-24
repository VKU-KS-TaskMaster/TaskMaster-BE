import MilestoneService from "@/services/milestone.service";

const MilestoneController = {
    get: async (req, res, next) => {
        try {
            const message = await MilestoneService.get(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    getList: async (req, res, next) => {
        try {
            const message = await MilestoneService.getList(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    store: async (req, res, next) => {
        try {
            const message = await MilestoneService.store(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    update: async (req, res, next) => {
        try {
            const message = await MilestoneService.update(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
    destroy: async (req, res, next) => {
        try {
            const message = await MilestoneService.destroy(req.body);
            return res.send(message);
        } catch (errors) {
            next(errors);
        }
    },
}

export default MilestoneController