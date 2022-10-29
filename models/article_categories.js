
module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("article_categories", {
        arc_id: {
            type: Sequelize.BIGINT,
            primaryKey: true, 
            autoIncrement: true
        },
        title : {
            type: Sequelize.BIGINT, 
        }, 
    }, {timestamps: false});
    Model.associate = function(models) { 
    };
    return Model;
};