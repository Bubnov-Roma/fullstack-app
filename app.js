const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')
const bodyParser = require('body-parser')
const analyticsRoutes = require('./routes/analytics.js')
const authRoutes = require('./routes/auth.js')
const categoryRoutes = require('./routes/category.js')
const orderRoutes = require('./routes/order.js')
const positionRoutes = require('./routes/position.js')
const movieRoutes = require('./routes/movie.js')
const keys = require('./config/keys.js')
const app = express();

mongoose
  .connect(keys.mongoURI)
  .then(() => (console.log('Connected to MongoDB')))
  .catch((err) => console.log(`DB connection error: ${err}`))

app.use(passport.initialize())
require('./middleware/passport')(passport)


app.use(express.json())
app.use(movieRoutes);

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/analytics', analyticsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist/client'))

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname, 'client', 'dist', 'client', 'index.html'
      )
    )
  })
}

module.exports = app;