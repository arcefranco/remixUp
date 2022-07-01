module.exports = (sequelize, DataTypes) => {


    const record = sequelize.define("record",{
        recordId: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        album:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        year:{
            type: DataTypes.INTEGER, 
        
        },
        img_url:{
            type: DataTypes.STRING,
            
        },
        artist: {
            type: DataTypes.STRING, 
             allowNull: false,
        }
        
        
    })
  
    return record
}