

const db = require('../database/database')
const User = db.users

const createUser = async (req, res) => { 
    const {username, password, email, img_url} = req.body
    
    
    if(!username || !password || !email){
        res.status(500).send('username, password & email are required')
    }
   
    const data = {
        username: username,
        password: password,
        email: email,
        img_url:img_url
    }

    const user = await User.create(data)
    if(user){
        return res.status(200).send(user)
    } else {
        return res.status(500).send('Something wrong!')
    }
}

const getAllUsers = async (req, res) => {
    const allUsers = await User.findAll()
    res.send(allUsers)
}

const getUsersById = async (req, res) => {
const {id} = req.params 

  
        const finded = await User.findOne({
            where:{
                id: id
            }
        })
        finded ? res.send(finded) : res.status(500).send('user does not exist')
    
}

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

module.exports =  {
    createUser,
    getUsersById,
    getAllUsers,
    deleteUser,
    updateUser
}

