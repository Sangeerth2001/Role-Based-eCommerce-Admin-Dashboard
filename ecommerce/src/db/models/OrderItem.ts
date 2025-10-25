import { Model, DataTypes, Optional, Association } from 'sequelize';
import sequelize from '../config.js';
import Order from './Order.js';
import Product from './Product.js';

// Define the interface for OrderItem attributes
interface OrderItemAttributes {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the interface for OrderItem creation
interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, 'id'> {}

// Define the OrderItem model class
class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
  public id!: number;
  public orderId!: number;
  public productId!: number;
  public quantity!: number;
  public price!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public readonly order?: Order;
  public readonly product?: Product;

  public static associations: {
    order: Association<OrderItem, Order>;
    product: Association<OrderItem, Product>;
  };
}

// Initialize the OrderItem model
OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    sequelize,
    tableName: 'order_items',
    timestamps: true,
  }
);

export default OrderItem;
