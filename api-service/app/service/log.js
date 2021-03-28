// app/service/user.js
const Service = require('egg').Service

class LogService extends Service {
  async find () {
    const query = this.ctx.request.query
    const limit = +query.limit || 10
    const page = +query.page || 1
    const count = await this.ctx.model.Log.count()
    const list = await this.ctx.model.Log.find()
      .skip(limit * (page - 1)).limit(limit).sort({ _id: -1 })
    return {
      list, // 数据集合
      page, // 当前是第几页
      limit: list.length, // 每页数据条数
      count, // 数据总条数
      pageCount: Math.ceil(count / limit) // 总共多少页
    }
  }
}

module.exports = LogService
