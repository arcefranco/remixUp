import { Model, DataTypes } from "sequelize";
import db from "../database/database";

class Review extends Model {
  declare reviewId: number;
  declare title: string;
  declare year: number;
  declare img_url: string;
  declare reviewText: string;
  declare rating: number;
  declare fav: boolean;
}

Review.init(
  {
    reviewId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    img_url: {
      type: DataTypes.STRING,
    },
    reviewText: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    fav: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "review",
    sequelize: db,
  }
);
