import { Model, DataTypes } from "sequelize";
import db from "../database/database";

class User extends Model {
  declare userId: number;
  declare username: string;
  declare password: string;
  declare email: string;
  declare img_url: string;
  declare rol: number;
}

User.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_url: {
      type: DataTypes.STRING,
    },
    rol: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "users",
    sequelize: db,
  }
);

export { User };
