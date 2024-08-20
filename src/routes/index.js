import express from 'express'

const router = express.Router()

// router.use('/api/v1/example', require('./example'))
router.use('/api/auth', require('./auth'))

export default router