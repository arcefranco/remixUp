

module.exports = (sequelize, DataTypes) => {


const users = sequelize.define("users",{
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
 
return users
}


