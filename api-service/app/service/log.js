// app/service/user.js
const Service = require('egg').Service

class LogService extends Service {
  async find () {
    const query = this.ctx.request.query
    const limit = +query.limit || 10
    const page = +query.page || 1
    // 或-$or
    let filter = {
      $or: [
        { 'req.value': { $gte: 0.6 } },
        { 'res.value': { $gte: 0.6 } },
        { 'ext.value': { $gte: 0.6 } }
      ]
    }
    // 与-默认
    filter = {
      'req.value': { $gte: 0.6 },
      'res.value': { $gte: 0.6 },
      'ext.value': { $gte: 0.6 }
    }
    // 与-默认
    filter = {
      // 效率低下 - 慎用 - 此案例可以通过存成字符串配合正则$regex实现
      $where: function () {
        // 待续.... 得不到入参
        const reqFilter = String(this.req.value).match(new RegExp("55"))
        // const resFilter = String(this.req.value).match(new RegExp(query.res))
        // const extFilter = String(this.req.value).match(new RegExp(query.ext))
        // return reqFilter && resFilter && extFilter
        return reqFilter
      }
    }
    const count = await this.ctx.model.Log.count(filter)
    const list = await this.ctx.model.Log
      .find(filter).skip(limit * (page - 1))
      .limit(limit).sort({ _id: -1 })
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
