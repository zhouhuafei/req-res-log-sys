'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async get () {
    const { ctx } = this
    const dataList = await ctx.model.Log.find().sort({ _id: -1 })
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
