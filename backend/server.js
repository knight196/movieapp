const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require('dotenv')
const path = require('path')
const authRoutes = require("./routes/routesauth")
const Userdashboard = require('./Userdashboard/Userorders')
const Admindashboard = require('./Admindashboard/AdminOrders')



dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


// Middlewares
app.use(express.json());
app.use(morgan('dev'))
app.use('/api/auth', authRoutes)
app.use(cors())

app.use('/orders', Userdashboard)
app.use('/api/', Admindashboard)

// connection url

//mongoose
mongoose.connect(process.env.MONGODB_URI)

//   app.use(express.static(path.join(__dirname, '../client/build')))
// app.use('/*', (req,res) => res.sendFile(path.join(__dirname, '../client/build/index.html')))


app.use('/', (req,res) => res.send('homepage'))

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`)
})