module.exports = (sequelize, Sequelize) => {
    const Monitor = sequelize.define("monitor", {
        // Name of the monitor
        name: {
            type: Sequelize.STRING
        },
        // Lastname of the monitor
        lastname: {
            type: Sequelize.STRING
        },
        // Actual career of the monitor
        career: {
            type: Sequelize.STRING
        },
        // Actual semester of the monitor
        semester: {
            type: Sequelize.INTEGER
        },
        // Personal identification of the monitor
        pid: {
            type: Sequelize.STRING
        },
        // Phone of the monitor
        phone: {
            type: Sequelize.INTEGER
        },
        // Email of the monitor
        email: {
            type: Sequelize.STRING
        },
        // Actual state of the monitor
        active: {
            type: Sequelize.BOOLEAN
        }
    });
    return Monitor;
};