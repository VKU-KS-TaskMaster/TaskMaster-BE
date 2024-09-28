import TeamService from "@/services/team.service";

const TeamController = {
  get: async (params, req, res, next) => {
    try {
      const message = await TeamService.get(params);
      return res.json(message);
    } catch (errors) {
      next(errors);
    }
  },
  search: async (params, req, res, next) => {
    try {
      const teams = await TeamService.search(params);
      return res.json(teams);
    } catch (errors) {
      next(errors);
    }
  },
  store: async (params, req, res, next) => {
    try {
      const team = await TeamService.store(params);
      return res.json(team);
    } catch (errors) {
      next(errors);
    }
  },
  update: async (params, req, res, next) => {
    try {
      const updatedTeam = await TeamService.update(params);
      return res.json(updatedTeam);
    } catch (errors) {
      next(errors);
    }
  },
  destroy: async (params, req, res, next) => {
    try {
      await TeamService.destroy(params);
      return res.json({ message: "Team deleted successfully" });
    } catch (errors) {
      next(errors);
    }
  },
  addMembers: async (params, req, res, next) => {
    try {

      const message = await TeamService.addMember(params);
      return res.json(message);
    } catch (errors) {
      next(errors);
    }
  }
};

export default TeamController;
