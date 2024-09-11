import MilestoneService, { MilestoneMemberService } from "@/services/milestone.service";

const MilestoneController = {
    get: async (req, res, next) => {
        try {
            const message = await MilestoneService.get(req.params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    search: async (req, res, next) => {
        try {
            const message = await MilestoneService.search(req.query);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    store: async (req, res, next) => {
        try {
            const message = await MilestoneService.store(req.body);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    update: async (req, res, next) => {
        try {
            const message = await MilestoneService.update(req.params, req.body);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    destroy: async (req, res, next) => {
        try {
            const message = await MilestoneService.destroy(req.params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },

    updateMembers: async (req, res, next) => {
        try {
            const message = await MilestoneMemberService.update(req.params, req.body);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    searchMembers: async (req, res, next) => {
        try {
            const message = await MilestoneMemberService.search(req.query);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    }
}

export default MilestoneController