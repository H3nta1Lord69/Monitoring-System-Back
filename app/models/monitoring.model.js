module.exports = (sequelize, Sequelize) => {
    const Monitoring = sequelize.define("monitoring", {
       class: {
            type: Sequelize.STRING
       },
       monitor_assign: {
            type: Sequelize.STRING
       },
       date_assign: {
            type: Sequelize.DATE
       },
       classroom: {
            type: Sequelize.STRING
       }
    });
    return Monitoring;
};