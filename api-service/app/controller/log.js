'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async get () {
    const { ctx, service } = this
    const dataList = await service.log.find()
    ctx.body = { result: { dataList } }
  }

  async post () {
    const { ctx } = this
    await ctx.model.Log.create(ctx.request.body)
    ctx.status = 204
    ctx.body = {}
  }
}

module.exports = HomeController
