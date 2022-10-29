
module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("users", {
        user_id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true, 
        },
        user_username : {
            type: Sequelize.STRING, 
        }, 
        user_phone : {
            type: Sequelize.STRING, 
        }, 
        user_fullname : {
            type: Sequelize.STRING, 
        }, 
        user_password : {
            type: Sequelize.STRING, 
        },  
    }, {timestamps: false});
    Model.associate = function(models) {
        // Model.belongsTo(models.equipment_stats, { foreignKey: 'artilvl_stattype', targetKey: 'eqstat_id' });
    };
    return Model;
};