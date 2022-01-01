const { DataTypes } = require("sequelize");

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.addColumn("users", "is_disabled", {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        });
    },
    down: async (queryInterface) => {
        await queryInterface.removeColumn("users", "is_disabled");
    },
};
