const express = require("express")
const cors = require("cors")
const userRoutes =require('./src/routes/userRouter')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const app = express();

var corOptions = {
    origin: 'https://localhost:3001'
}

app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
 

app.use('/users', userRoutes)



app.get('/', (req,res) => {
    res.json('Welcome to API remixUp')
})

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=> {
    console.log(`server listen on port ${PORT}`)
})