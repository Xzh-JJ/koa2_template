import sequelize from "@main/db";
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

const userModel = sequelize.model('userModel');
class UserService {
  static async register(user) {
    const { username,telephone } = user;
    const repeatUser = await userModel.findAll({
      where:{
        [Op.or]: [
          {"username": username},
          {"telephone": telephone}
        ]
      }
    })
    if (repeatUser && repeatUser.length === 0) {
      return await userModel.create(user);
    } else {
      throw new Error('注册失败,用户已存在！');
    }
  }

  static async delete(id) {
    return await userModel.destroy({
      where: {
        id: id
      }
    })
  }

  static async checkRepeat(param) {
    return await userModel.findAll({
      where: {
        username:param
      }
    });
  }

  static async findById(id) {
    return await userModel.findByPk(id);
  }

  static async findAll() {
    return await userModel.findAll();
  }

  static async updateById(user) {
    return await userModel.update(user,{
      where: {
        id: user.id
      }
    })
  }

  static async login(user) {
    return await userModel.findAll({
      where: {
        username: user.username,
        password: user.password
      }
    })
  }
}

export default UserService;