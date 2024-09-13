import MilestoneService, { MilestoneMemberService } from "@/services/milestone.service";

const MilestoneController = {
    get: async (params, req, res, next) => {
        try {
            const message = await MilestoneService.get(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    search: async (params, req, res, next) => {
        try {
            const message = await MilestoneService.search(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    store: async (params, req, res, next) => {
        try {
            const message = await MilestoneService.store(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    update: async (params, req, res, next) => {
        try {
            const message = await MilestoneService.update(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    destroy: async (params, req, res, next) => {
        try {
            const message = await MilestoneService.destroy(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },

    updateMembers: async (params, req, res, next) => {
        try {
            const message = await MilestoneMemberService.update(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    searchMembers: async (params, req, res, next) => {
        try {
            const message = await MilestoneMemberService.search(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    }
}

export default MilestoneController