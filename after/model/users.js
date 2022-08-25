const Sequelize = require("sequelize");

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                user_id: {
                    type: Sequelize.STRING(16),
                    allowNull: false,
                    primaryKey: true,
                },
                user_pw: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                name: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                },
                nick_name: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                },
                mobile_number: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize: sequelize,
                timestamps: true,
                underscored: true,
                modelName: "User",
                tableName: "users",
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
    static associate(db) {
        db.User.hasMany(db.CommunityPost, {
            foreignKey: "user_id",
            sourceKey: "user_id",
        });
    }
}

module.exports = User;
