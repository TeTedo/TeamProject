const Sequelize = require("sequelize");

class CommunityPostLike extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                post_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                user_id: {
                    type: Sequelize.STRING(16),
                    allowNull: false,
                },
                nick_name: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                },
            },
            {
                sequelize: sequelize,
                timestamps: true,
                underscored: true,
                modelName: "CommunityPostLike",
                tableName: "communityPostLikes",
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
}

module.exports = CommunityPostLike;
