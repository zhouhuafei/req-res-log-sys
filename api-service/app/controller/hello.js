'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async get () {
    const { ctx } = this
    ctx.body = { hello: 'world' }
  }
}

module.exports = HomeController
