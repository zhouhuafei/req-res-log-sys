'use strict'

const sign = require('./sign')

const path = `/req-res-log-sys/api`

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get(path + '/', controller.hello.get)
  router.get(path + '/log', controller.log.get)
  router.post(path + '/log', sign, controller.log.post)
}
