

module.exports = (sequelize, DataTypes) => {


const User = sequelize.define("users",{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    img_url:{
        type: DataTypes.STRING,
        
    },
    rol:{
        type: DataTypes.INTEGER,
    }
})

return User
}


