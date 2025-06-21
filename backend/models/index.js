const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db');

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./User')(sequelize, DataTypes);
db.Transaction = require('./Transaction')(sequelize, DataTypes);
db.Budget = require('./Budget')(sequelize, DataTypes);

// Relations
db.User.hasMany(db.Transaction);
db.Transaction.belongsTo(db.User);

module.exports = db;
