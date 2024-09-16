const TEAM_MEMBER_TYPE_OWNER = 0;
const TEAM_MEMBER_TYPE_MEMBER = 1;

const TeamMemberTypeEnum = {
  TEAM_MEMBER_TYPE_OWNER,
  TEAM_MEMBER_TYPE_MEMBER,
};

const TeamMemberTypeEnumArr = Object.values(TeamMemberTypeEnum);

export default TeamMemberTypeEnumArr;

export {
  TEAM_MEMBER_TYPE_MEMBER, TEAM_MEMBER_TYPE_OWNER
};
