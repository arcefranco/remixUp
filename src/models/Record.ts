import { Model, DataTypes } from "sequelize";
import db from "../database/database";

class Record extends Model {
  declare recordId: number;
  declare album: string;
  declare year: number;
  declare img_url: string;
  declare artist: string;
}

Record.init(
  {
    recordId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    album: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    img_url: {
      type: DataTypes.STRING,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "record",
    sequelize: db,
  }
);

export { Record };
