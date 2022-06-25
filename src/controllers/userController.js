
const db = require('../database/database')
const Op = require('Sequelize').Op
const bcrypt = require("bcrypt")
const asyncHandler = require('express-async-handler')
const jwt = require("jsonwebtoken")
require("dotenv").config();
const User = db.users


const createUser = async (req, res) => { 
    const {username, password, email, img_url} = req.body

    if(!username || !password || !email){
        res.status(500).send('username, password & email are required')
    }
    const unique = await User.findOne({
        where:{
            [Op.or]: {
                username:
                    {
                        [Op.eq]: username
                    },

                email: {
                    [Op.eq]: email
                }
            }
        }
    })

    if (!unique) {
    const hash = await bcrypt.hash(password, 8)
    const data = {
        username: username,
        password: hash,
        email: email,
        img_url:img_url
    }

    const user = await User.create(data)
    if(user){
        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user.id)
        })
       
   /*      const token = jwt.sign({id: user.id}, process.env.SECRET, {
            expiresIn: 60 * 60 * 24 
        })
        return res.json({auth:true, token}) */
    } else {
        return res.status(500).send('Something wrong!')
    } 
    } else { 
        return res.status(404).send('Existing username or email')
    }
    
}
const getAllUsers = async (req, res) => {
    const allUsers = await User.findAll()
    res.send(allUsers)
}
/* const getUsersById = async (req, res) => {
const {id} = req.params 

  
        const finded = await User.findOne({
            where:{
                id: id
            }
        })
        finded ? res.send(finded) : res.status(500).send('userrr does not exist')
    
} */
const deleteUser = async (req, res) => {
    const {id} = req.params

    try {
        const user = await User.findByPk(id)
        console.log(user)
        if(!user) {
            return res.status(404).json({
                msg:'Not existing user with id ' + id
            })
         }else{
           await User.destroy({
            where:{
                id: id
            }
           })
           return res.json(`User ${id} has been deleted correctly`)
         }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Talk with the administrator'
        })
    }
  
}
const updateUser = async (req, res) => {
    const {id} = req.params
    const {body} = req

    try {
     const user = await User.findByPk(id)
     if(!user) {
        return res.status(404).json({
            msg:'Not existing user with id ' + id
        })
     }
     await User.update(body, {
        where:{
            id: id
        }
     })
     const updated = await User.findOne({
        where:{
            id: id
        }
     })
    return res.json(updated)
        }
        
     catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Talk with the administrator'
        })
    }
}
const login = async (req, res) => {
    const {email} = req.body
    const {password} = req.body
    const user = await User.findOne({
        where:{
            email: email
        }
    })
    
    if (!email || !password) {   
        res.status(400).send({
            status: false,
            message: "Email & password are requiered"
        });
    }
    if(user &&(await bcrypt.compare(password, user.password))){

         res.status(201).send({
            id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user.id)
        })

    }else{
        res.status(400).send({
            message: "Invalid credentials"
        })
    }
}

const generateToken = (id) => {
    return jwt.sign({id}, process.env.SECRET, {
        expiresIn: 8640
    })
    
}

const getMe = asyncHandler(async (req, res) => {

    res.status(200).json(req.user)
  })

module.exports =  {
    createUser,
    getAllUsers,
    deleteUser,
    updateUser,
    getMe,
    login
}

