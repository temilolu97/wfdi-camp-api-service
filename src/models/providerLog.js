module.exports = (sequelize, DataTypes) => {
    const ProviderLog = sequelize.define('ProviderLog', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        type:{
            type:DataTypes.STRING,
            allowNull:false
        },
        requestContent:{
            type:DataTypes.TEXT
        },
        Status:{
            type:DataTypes.STRING,
            defaultValue:"Received"
        },
        Message:{
            type:DataTypes.STRING
        }
    },{
        tableName:'providerLogs',
        timestamps:true
    })

    return ProviderLog
}