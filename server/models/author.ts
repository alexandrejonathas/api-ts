export default function(sequelize, DataTypes){

    const Author = sequelize.define('Author', {
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
    },  {
        
    });
    
    Author.associate = models => {
        Author.hasMany(models.Post, {
            foreignKey: 'authorId',
            as: 'posts'
        });
    }

    return Author;
}