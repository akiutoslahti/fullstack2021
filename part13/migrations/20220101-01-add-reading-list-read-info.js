const { DataTypes } = require("sequelize");

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.addColumn("readings", "is_read", {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        });
    },
    down: async (queryInterface) => {
        await queryInterface.removeColumn("readings", "is_read");
    },
};
