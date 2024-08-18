const express = require('express')
const router = express.Router()

router.use('/api/v1/example', require('./example'))

module.exports = router