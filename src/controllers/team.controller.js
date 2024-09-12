import TeamService from "@/services/team.service";

const TeamController = {
  get: async (req, res, next) => {
    try {
      const { code } = req.params;
      const message = await TeamService.get(code);
      return res.send(message);
    } catch (errors) {
      next(errors);
    }
  },
  getList: async (req, res, next) => {
    try {
      const { name, code, status } = req.query;
      const searchParams = {};
      if (name) searchParams.name = name;
      if (code) searchParams.code = code;
      if (status)
        searchParams.status = status
          .split(",")
          .map((s) => parseInt(s.trim(), 10));

      const teams = await TeamService.getList(searchParams);
      return res.send(teams);
    } catch (errors) {
      next(errors);
    }
  },
  store: async (req, res, next) => {
    try {
      const team = await TeamService.store(req.body);
      return res.send(team);
    } catch (errors) {
      next(errors);
    }
  },
  update: async (req, res, next) => {
    try {
      const { code } = req.params;
      const updatedTeam = await TeamService.update(code, req.body);
      return res.send(updatedTeam);
    } catch (errors) {
      next(errors);
    }
  },
  destroy: async (req, res, next) => {
    try {
      const { code } = req.params;
      await TeamService.destroy(code);
      return res.send({ message: "Team deleted successfully" });
    } catch (errors) {
      next(errors);
    }
  },
};

export default TeamController;
