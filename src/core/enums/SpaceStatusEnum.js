const SPACE_STATUS_PENDING = 0;
const SPACE_STATUS_ACTIVE = 1;
const SPACE_STATUS_INACTIVE = 2;
const SPACE_STATUS_COMPLETED = 3;
const SPACE_STATUS_DELETED = 4;

const SpaceStatusEnum = {
  [SPACE_STATUS_PENDING]: SPACE_STATUS_PENDING,
  [SPACE_STATUS_ACTIVE]: SPACE_STATUS_ACTIVE,
  [SPACE_STATUS_INACTIVE]: SPACE_STATUS_INACTIVE,
  [SPACE_STATUS_COMPLETED]: SPACE_STATUS_COMPLETED,
  [SPACE_STATUS_DELETED]: SPACE_STATUS_DELETED,
};

const SpaceStatusEnumArr = [
  SPACE_STATUS_PENDING,
  SPACE_STATUS_ACTIVE,
  SPACE_STATUS_INACTIVE,
  SPACE_STATUS_COMPLETED,
  SPACE_STATUS_DELETED,
];

export default SpaceStatusEnumArr;

export {
  SPACE_STATUS_PENDING,
  SPACE_STATUS_ACTIVE,
  SPACE_STATUS_INACTIVE,
  SPACE_STATUS_COMPLETED,
  SPACE_STATUS_DELETED,
};
