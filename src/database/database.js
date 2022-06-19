require("dotenv").config();
const {Sequelize, DataTypes} = require('sequelize')

const {DB_NAME, DB_PASSWORD, DB_HOST, DB_USER, DB_DRIVE} = process.env

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD,{
    host: DB_HOST,
    dialect: DB_DRIVE
})

sequelize.authenticate()
.then(() => {
    console.log('DB connected')
})
.catch(err => {
    console.log(err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('../models/User.js')(sequelize, DataTypes)

db.sequelize.sync({force: false})
.then(()=> {
    console.log('re-sync done!')
})

module.exports = db