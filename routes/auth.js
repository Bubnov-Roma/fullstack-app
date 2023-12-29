const express = require('express')
const CONTROLLER = require('../controllers/auth.js')
const ROUTER = express.Router()

// localhost:3333/api/auth/login
ROUTER.post('/login', CONTROLLER.login)

// localhost:3333/api/auth/register
ROUTER.post('/register', CONTROLLER.register)
module.exports = ROUTER