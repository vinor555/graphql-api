module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    });
  
    User.associate = (models) => {
      User.hasMany(models.Post, { foreignKey: 'userId' });
      User.hasMany(models.Comment, { foreignKey: 'userId' });
    };
  
    return User;
  };
  