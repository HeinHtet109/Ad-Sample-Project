
//importing modules
const express = require('express')
const path = require('path')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const db = require('./Models')
const authRoutes = require('./Routes/authRoutes')


//setting up your port
const PORT = process.env.PORT || 8080

//assigning the variable app to express
const app = express()
const PublicPath = path.join(__dirname, 'Public')

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: true }).then(() => {
    console.log("db has been re sync")
})

//routes for the user API
app.use('/api/users', authRoutes)
app.use(express.static(PublicPath));

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))
