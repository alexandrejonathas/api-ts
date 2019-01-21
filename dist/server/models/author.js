"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(sequelize, DataTypes) {
    var Author = sequelize.define('Author', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {});
    Author.associate = function (models) {
        Author.hasMany(models.Post, {
            foreignKey: 'authorId',
            as: 'posts'
        });
    };
    return Author;
}
exports.default = default_1;
