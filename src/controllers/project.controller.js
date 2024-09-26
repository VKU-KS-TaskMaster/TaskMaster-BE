import ProjectService, { ProjectMemberService, ProjectTeamService } from "@/services/project.service";

const ProjectController = {
    get: async (params, req, res, next) => {
        try {
            const message = await ProjectService.get(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    search: async (params, req, res, next) => {
        try {
            const message = await ProjectService.search(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    store: async (params, req, res, next) => {
        try {
            const message = await ProjectService.store(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    update: async (params, req, res, next) => {
        try {
            const message = await ProjectService.update(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    destroy: async (params, req, res, next) => {
        try {
            const message = await ProjectService.destroy(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    
    updateMembers: async (params, req, res, next) => {
        try {
            const message = await ProjectMemberService.update(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    searchMembers: async (params, req, res, next) => {
        try {
            const message = await ProjectMemberService.search(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    addTeam: async (params, req, res, next) => {
        try {
            const message = await ProjectTeamService.addTeamToProject(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
    removeTeam: async (params, req, res, next) => {
        try {
            const message = await ProjectTeamService.removeTeamFromProject(params);
            return res.json(message);
        } catch (errors) {
            next(errors);
        }
    },
}

export default ProjectController