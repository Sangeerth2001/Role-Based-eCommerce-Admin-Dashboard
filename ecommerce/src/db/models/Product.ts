import { Model, DataTypes, Optional, Association } from 'sequelize';
import sequelize from '../config.js';
import Category from './Category.js';

// Define the interface for Product attributes
interface ProductAttributes {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: number;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the interface for Product creation
interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'description' | 'image' | 'stock'> {}

// Define the Product model class
class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public description?: string;
  public price!: number;
  public stock!: number;
  public categoryId!: number;
  public image?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association to Category
  public readonly category?: Category;

  public static associations: {
    category: Association<Product, Category>;
  };
}

// Initialize the Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: true,
  }
);

export default Product;
