'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async get () {
    const { ctx } = this
    ctx.body = { hello: 'world get' }
  }

  async post () {
    const { ctx } = this
    ctx.body = { hello: 'world post' }
  }
}

module.exports = HomeController
