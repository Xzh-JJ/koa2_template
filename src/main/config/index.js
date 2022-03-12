export default {
  middlewares: [
    'globalError',
    'publicResult'
  ],
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    dialect: process.env.DB_DIALECT,
    define: {
      // 数据库字段下划线命名，匹配模型驼峰式命名
      underscored:true,
      // 禁止修改表名
      freezeTableName: true
    },
    timezone: '+08:00',
    dialectOptions: {
      typeCast: true,
      dateStrings: true,
    }
  }
};