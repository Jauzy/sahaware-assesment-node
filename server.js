require('dotenv').config()

const express = require("express")
const app = express()
const PORT = process.env.PORT || 7000
const serveIndex = require('serve-index');

const db = require("./models");
db.sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

//cors
app.use(require('cors')())

//body-parser express
app.use(express.json({ limit: '2048mb' }))
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('public'), serveIndex('public', {'icons': true}));

//routers in index.js
const router = require('./routes/index')
app.use('/', router)

app.listen(PORT, (err) => {
    if(err) console.log(err)
    console.log(`Server running on port ${PORT}`)
})