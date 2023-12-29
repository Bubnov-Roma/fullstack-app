const express = require('express')
const CONTROLLER = require('../controllers/analytics.js')
const ROUTER = express.Router()
const passport = require('passport')

// localhost:3333/api/analytics/overview
ROUTER.get('/overview',
  passport.authenticate('jwt', { session: false }),
  CONTROLLER.overview
)

// localhost:3333/api/analytics/analytics
ROUTER.get('/analytics',
  passport.authenticate('jwt', { session: false }),
  CONTROLLER.analytics
)

module.exports = ROUTER