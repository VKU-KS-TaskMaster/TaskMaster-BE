const COMMENT_STATUS_PENDING = 0
const COMMENT_STATUS_INPROGRESS = 1
const COMMENT_STATUS_REVIEW = 2
const COMMENT_STATUS_COMPLETED = 3
const COMMENT_STATUS_ONLEAVE = 4
const COMMENT_STATUS_CANCELLED = 5
const COMMENT_STATUS_DELETED = 6

const CommentStatusEnum = {
    [COMMENT_STATUS_PENDING]: COMMENT_STATUS_PENDING,
    [COMMENT_STATUS_INPROGRESS]: COMMENT_STATUS_INPROGRESS,
    [COMMENT_STATUS_REVIEW]: COMMENT_STATUS_REVIEW,
    [COMMENT_STATUS_COMPLETED]: COMMENT_STATUS_COMPLETED,
    [COMMENT_STATUS_ONLEAVE]: COMMENT_STATUS_ONLEAVE,
    [COMMENT_STATUS_CANCELLED]: COMMENT_STATUS_CANCELLED,
    [COMMENT_STATUS_DELETED]: COMMENT_STATUS_DELETED,
}

const CommentStatusEnumArr = [
    COMMENT_STATUS_PENDING,
    COMMENT_STATUS_INPROGRESS,
    COMMENT_STATUS_REVIEW,
    COMMENT_STATUS_COMPLETED,
    COMMENT_STATUS_ONLEAVE,
    COMMENT_STATUS_CANCELLED,
    COMMENT_STATUS_DELETED
]

export default CommentStatusEnumArr

export {
    COMMENT_STATUS_PENDING,
    COMMENT_STATUS_INPROGRESS,
    COMMENT_STATUS_REVIEW,
    COMMENT_STATUS_COMPLETED,
    COMMENT_STATUS_ONLEAVE,
    COMMENT_STATUS_CANCELLED,
    COMMENT_STATUS_DELETED,
}