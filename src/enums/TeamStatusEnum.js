const TEAM_STATUS_PENDING = 0;
const TEAM_STATUS_ACTIVE = 1;
const TEAM_STATUS_INACTIVE = 2;
const TEAM_STATUS_COMPLETED = 3;
const TEAM_STATUS_DELETED = 4;

const TeamStatusEnum = {
  TEAM_STATUS_PENDING,
  TEAM_STATUS_ACTIVE,
  TEAM_STATUS_INACTIVE,
  TEAM_STATUS_COMPLETED,
  TEAM_STATUS_DELETED,
};

const TeamStatusEnumArr = Object.values(TeamStatusEnum);

export default TeamStatusEnumArr;

export {
  TEAM_STATUS_ACTIVE,
  TEAM_STATUS_COMPLETED,
  TEAM_STATUS_DELETED,
  TEAM_STATUS_INACTIVE,
  TEAM_STATUS_PENDING
};

