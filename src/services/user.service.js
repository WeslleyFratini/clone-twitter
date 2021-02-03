const UserModel = require("../models/User");

module.exports = {
  async create(data) {      
      const { password } = data
      const encryptedPassword = bcrypt.hashSync(password, 2);

      return await UserModel.create({...data,password: encryptedPassword});
       
};
