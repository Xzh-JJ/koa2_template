import Sequelize from 'sequelize';
import { ParamError } from '@main/common/globalError';

export const modelName = 'movieModel';

export const attributes = {
  movieName: {
    type: Sequelize.STRING(45)
  },
  movieImg: {
    type: Sequelize.STRING(200)
  },
  movieIntroduce: {
    type: Sequelize.STRING(200),
  },
  movieBoxOffice: {
    type: Sequelize.STRING(45)
  },
  movieReleaseDate: {
    type: Sequelize.STRING,
  },
  movieType: {
    type: Sequelize.STRING(45)
  }
}

export const options = {
  tableName: 'TB_Movies'
}