export default function(sequelize, DataTypes){

    const Post = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }            
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }       
    },  {

    });

    Post.associate = models => {
        Post.belongsTo(models.Author, {
            foreignKey: 'authorId',
            as: 'author'
        });        
    }

    return Post;
}