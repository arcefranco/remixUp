require("dotenv").config();
import { Sequelize, DataTypes, Options, Dialect } from "sequelize";

interface db {
  Sequelize: Sequelize;
}

const { DB_NAME, DB_PASSWORD, DB_HOST, DB_USER, DB_DRIVE } = process.env;

const db = new Sequelize(DB_NAME as string, DB_USER as string, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DRIVE as Dialect,
});

export default db;

/* sequelize.authenticate()
.then(() => { 
    console.log('DB connected')
})
.catch(err => {
    console.log(err)
})

const db = {} as Options
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('../models/User.js').default(sequelize, DataTypes)
db.review = require('../models/Review.js').default(sequelize, DataTypes)
db.record = require('../models/Record').default(sequelize, DataTypes) */
/* 
const {users, review} = sequelize.models */
/* db.users.hasMany(db.review) 
db.review.belongsTo(db.users)

db.sequelize.sync({force: true}) 
.then(()=> {
    console.log('re-sync done!')
})

export default db */
