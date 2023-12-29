const express = require('express');
// const Movie = require('../models/Movie')
const {
  getMovies,
  getMovie,
  deleteMovie,
  addMovie,
  updateMovie
} = require('../controllers/movie')

const ROUTER = express.Router()

ROUTER.get('/movies', getMovies)
ROUTER.get('/movies/:id', getMovie)
ROUTER.delete('/movies/:id', deleteMovie)
ROUTER.post('/movies', addMovie)
ROUTER.patch('/movies/:id', updateMovie)

module.exports = ROUTER 