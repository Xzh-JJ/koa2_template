import Sequelize from 'sequelize';
import { ParamError } from '@main/common/globalError';

export const modelName = 'userModel';

export const attributes = {
  username: {
    type:  Sequelize.STRING(20),
    unique: true,
  },
  password: {
    type: Sequelize.STRING(20),   
  },
  gender: {
    type: Sequelize.TINYINT,
    get() {
      const rawValue = this.getDataValue('gender');
      const newRawvalue = rawValue === 1 ? '男' : '女';
      return newRawvalue;
    },
    set(val) {
      if (val instanceof String) {
        const newRawvalue = val === '男' ? 1 : 0
        return newRawvalue;
      }
      return val
    }
  },
  email: {
    type: Sequelize.STRING(30)
  },
  areaCode: {
    type: Sequelize.STRING(10)
  },
  telephone: {
    type: Sequelize.STRING(18)
  },
  headerImg: {
    type: Sequelize.BLOB,
    get() {
      const rawValue = this.getDataValue('headerImg')
      if (rawValue) {
        const newRawvalue = 'data:'+this.headerImgType+';base64,'+Buffer.from(rawValue,'binary').toString();
        return newRawvalue;
      }
      return rawValue;
    }
  },
  headerImgType: {
    type: Sequelize.STRING(30)
  }
}

export const options = {
  tableName: 'TB_Users'
}