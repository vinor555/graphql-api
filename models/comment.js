module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      content: DataTypes.TEXT,
    });
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.User, { foreignKey: 'userId' });
      Comment.belongsTo(models.Post, { foreignKey: 'postId' });
    };
  
    return Comment;
  };
  