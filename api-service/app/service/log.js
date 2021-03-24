// app/service/user.js
const Service = require('egg').Service

class LogService extends Service {
  async find () {
    return await this.ctx.model.Log.find().sort({ _id: -1 })
  }
}

module.exports = LogService
