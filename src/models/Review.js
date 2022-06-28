module.exports = (sequelize, DataTypes) => {


    const review = sequelize.define("review",{
        reviewId: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        year:{
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        img_url:{
            type: DataTypes.STRING,
            
        },
        reviewText:{
            type: DataTypes.STRING(1234),
            allowNull: false, 
        },
        rating:{
            type: DataTypes.INTEGER,
        },
        fav:{
            type: DataTypes.BOOLEAN,
        }
        
        
    })
  
    return review
}
    