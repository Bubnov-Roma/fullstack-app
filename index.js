// const express = require('express')
const app = require('./app.js')
// const mongoose = require('mongoose');
// const { ObjectId } = require('mongodb')
// const { connectToDb, getDb } = require('./db')
// const Movie = require('./models/Movie.js')


const port = process.env.PORT || 3333
// const URL = "mongodb+srv://kilkun:Pass321@cluster0.vktplgp.mongodb.net/moviebox?retryWrites=true&w=majority"


// mongoose
//   .connect(URL)
//   .then(() => (console.log('Connected to MongoDB from mongoose')))
//   .catch((err) => console.log(`DB connection error: ${err}`))

app.listen(port, () => {
  console.log(`Server has been started on ${port}`)
  // db = getDb()
})

// let db;
// connectToDb((err) => {
//   if (!err) {
//     app.listen(port, () => {
//       console.log(`Server has been started on ${port}`)
//     db = getDb()
//     })
//     db = getDb()
//   } else {
//     console.log(`DB connection error: ${err}`)
//   }
// })


// app.get('/movies', (req, res) => {
//   const users = []
//   db
//     .collection('movies')
//     .find()
//     .sort({ title: 1 })
//     .forEach((user) => users.push(user))
//     .then(() => {
//       res
//         .status(200)
//         .json(users)
//     })
//     .catch(() => handleError(res, "something goes wrong"))
// })

// app.get('/movies/:id', (req, res) => {
//   if (ObjectId.isValid(req.params.id)) {
//     db
//       .collection('movies')
//       .findOne({ _id: new ObjectId(req.params.id) })
//       .then((doc) => {
//         res
//           .status(200)
//           .json(doc)
//       })
//       .catch(() => handleError(res, "something goes wrong"))
//   } else {
//     handleError(res, "wrong id")
//   }
// })

// app.delete('/movies/:id', (req, res) => {
//   if (ObjectId.isValid(req.params.id)) {
//     db
//       .collection('movies')
//       .deleteOne({ _id: new ObjectId(req.params.id) })
//       .then((result) => {
//         res
//           .status(200)
//           .json(result)
//       })
//       .catch(() => handleError(res, "something goes wrong"))
//   } else {
//     handleError(res, "wrong id")
//   }
// })

// app.post('/movies', (req, res) => {
//   db
//     .collection('movies')
//     .insertOne(req.body)
//     .then((result) => {
//       res
//         .status(201)
//         .json(result)
//     })
//     .catch(() => handleError(res, "something goes wrong"))
// })

// app.patch('/movies/:id', (req, res) => {
//   if (ObjectId.isValid(req.params.id)) {
//     db
//       .collection('movies')
//       .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
//       .then((result) => {
//         res
//           .status(200)
//           .json(result)
//       })
//       .catch(() => handleError(res, "something goes wrong"))
//   } else {
//     handleError(res, "wrong id")
//   }
// })


// const handleError = (res, error) => {
//   res.status(500).json({ error })
// }

// app.get('/movies', (req, res) => {
//   Movie
//     .find()
//     .sort({ title: 1 })
//     .then((movies) => {
//       res
//         .status(200)
//         .json(movies)
//     })
//     .catch(() => handleError(res, "something goes wrong"))
// })

// app.get('/movies/:id', (req, res) => {
//   Movie
//     .findById(req.params.id)
//     .then((dmovie) => {
//       res
//         .status(200)
//         .json(dmovie)
//     })
//     .catch(() => handleError(res, "something goes wrong"))
// })

// app.delete('/movies/:id', (req, res) => {
//   Movie
//     .findByIdAndDelete(req.params.id)
//     .then((result) => {
//       res
//         .status(200)
//         .json(result)
//     })
//     .catch(() => handleError(res, "something goes wrong"))

// })

// app.post('/movies', (req, res) => {
//   let movie = new Movie(req.body)

//   movie
//     .save()
//     .then((result) => {
//       res
//         .status(201)
//         .json(result)
//     })
//     .catch(() => handleError(res, "something goes wrong..."))
// })

// app.patch('/movies/:id', (req, res) => {
//   Movie
//     .findByIdAndUpdate(req.params.id, req.body)
//     .then((result) => {
//       res
//         .status(200)
//         .json(result)
//     })
//     .catch(() => handleError(res, "something goes wrong"))
// })