const express = require('express')
const passport = require('passport')
const CONTROLLER = require('../controllers/position.js')
const ROUTER = express.Router()

// localhost:3333/api/position/
ROUTER.get('/:categoryId',
  passport.authenticate('jwt', { session: false }),
  CONTROLLER.getByCategoryId
)

// localhost:3333/api/position/
ROUTER.post('/',
  passport.authenticate('jwt', { session: false }),
  CONTROLLER.create
)

// localhost:3333/api/position/:id
ROUTER.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  CONTROLLER.update
)

// localhost:3333/api/position/:id
ROUTER.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  CONTROLLER.remove
)

module.exports = ROUTER