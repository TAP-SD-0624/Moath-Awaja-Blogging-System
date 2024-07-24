import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.config';

class Category extends Model {
    public id!: number;
    public name!: string;
}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Category',
});

export default Category;
