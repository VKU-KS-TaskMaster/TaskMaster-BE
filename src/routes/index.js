import express from 'express'

const router = express.Router()

router.use('/api/auth', require('./auth'))
router.use('/api/user_info', require('./userInfo'))
router.use('/api/space', require('./space'))
router.use('/api/project', require('./project'))
router.use('/api/milestone', require('./milestone'))
router.use('/api/team', require('./team'))
router.use('/api/task', require('./task'))
// router.use('/api/member', require('./member'))
// router.use('/api/favorite', require('./favorite'))
// router.use('/api/comment', require('./comment'))

export default router