import { Model, DataTypes, Optional, Association } from 'sequelize';
import sequelize from '../config.js';

// Forward declaration for Product to avoid circular dependency
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

// Define the interface for Category attributes
interface CategoryAttributes {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the interface for Category creation (id is optional)
interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id' | 'description'> {}

// Define the Category model class
class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  public id!: number;
  public name!: string;
  public description?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association to Products
  public readonly products?: Product[];

  public static associations: {
    products: Association<Category, any>;
  };
}

// Initialize the Category model
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'categories',
    timestamps: true,
  }
);

export default Category;
