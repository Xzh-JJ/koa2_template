import config from "@main/config";
import Sequelize from 'sequelize';
import requireDirectory from "require-directory";

const sequelize = new Sequelize(config.db);

requireDirectory(module,'../model',{
  visit: (obj) => {
    if (obj.modelName) {
      sequelize.define(obj.modelName,obj.attributes, obj.options);
    }
  }
})

export default sequelize;