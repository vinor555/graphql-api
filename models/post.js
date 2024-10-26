module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
    });
  
    Post.associate = (models) => {
      Post.belongsTo(models.User, { foreignKey: 'userId' });
      Post.hasMany(models.Comment, { foreignKey: 'postId' });
    };
  
    return Post;
  };
  