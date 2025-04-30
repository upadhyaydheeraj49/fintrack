module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("Transaction", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM("income", "expense"),
        allowNull: false
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      timestamps: true
    });
  
    return Transaction;
  };
  