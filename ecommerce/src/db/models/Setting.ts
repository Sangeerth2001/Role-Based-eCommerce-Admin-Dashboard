import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config.js';

// Define the interface for Setting attributes
interface SettingAttributes {
  id: number;
  key: string;
  value: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the interface for Setting creation
interface SettingCreationAttributes extends Optional<SettingAttributes, 'id' | 'description'> {}

// Define the Setting model class
class Setting extends Model<SettingAttributes, SettingCreationAttributes> implements SettingAttributes {
  public id!: number;
  public key!: string;
  public value!: string;
  public description?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Setting model
Setting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'settings',
    timestamps: true,
  }
);

export default Setting;
