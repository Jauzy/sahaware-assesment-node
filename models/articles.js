
module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("articles", {
        ar_id: {
            type: Sequelize.BIGINT,
            primaryKey: true, 
            autoIncrement: true
        },
        ar_user_id : {
            type: Sequelize.BIGINT, 
        }, 
        category_id : {
            type: Sequelize.BIGINT, 
        }, 
        title : {
            type: Sequelize.STRING, 
        }, 
        description : {
            type: Sequelize.TEXT, 
        }, 
        short_description : {
            type: Sequelize.TEXT, 
        }, 
        image : {
            type: Sequelize.STRING, 
        }, 
        is_visible : {
            type: Sequelize.BOOLEAN, 
        },  
    }, {timestamps: false});
    Model.associate = function(models) {
        Model.belongsTo(models.users, { foreignKey: 'ar_user_id', targetKey: 'user_id' });
        Model.belongsTo(models.article_categories, { foreignKey: 'category_id', targetKey: 'arc_id' });
    };
    return Model;
};