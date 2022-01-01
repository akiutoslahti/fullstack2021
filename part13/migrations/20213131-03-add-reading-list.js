const { DataTypes } = require("sequelize");

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable("readings", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "users", key: "id" },
            },
            blog_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "blogs", key: "id" },
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("readings");
    },
};
