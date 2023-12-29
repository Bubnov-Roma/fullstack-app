const express = require('express')
const passport = require('passport')
const CONTROLLER = require('../controllers/order.js')
const ROUTER = express.Router()

// localhost:3333/order/
ROUTER.get('/',
  passport.authenticate('jwt', { session: false }),
  CONTROLLER.getAll
)

// localhost:3333/order/
ROUTER.post('/', passport.authenticate('jwt', { session: false }),
  CONTROLLER.create
)

module.exports = ROUTER