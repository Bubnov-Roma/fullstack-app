const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload.js')
const CONTROLLER = require('../controllers/category.js')
const ROUTER = express.Router()

// localhost:3333/api/category/
ROUTER.get('/',
  passport.authenticate('jwt', { session: false }),
  CONTROLLER.getAll
)

// localhost:3333/api/category/:id
ROUTER.get('/:id',
  passport.authenticate('jwt', { session: false }),
  CONTROLLER.getById
)
module.exports = ROUTER

// localhost:3333/api/category/:id
ROUTER.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  CONTROLLER.remove
)
module.exports = ROUTER

// localhost:3333/api/category/
ROUTER.post('/',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  CONTROLLER.create
)
module.exports = ROUTER

// localhost:3333/api/category/:id
ROUTER.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  CONTROLLER.update
)

module.exports = ROUTER