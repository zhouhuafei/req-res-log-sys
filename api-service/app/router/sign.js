const { signSecretKey } = require('../../../sys.config')
const md5 = require('md5')

function createSign (data) {
  let sign = ''
  Object.keys(data).sort().forEach(key => {
    if (key === 'sign') return
    let val = data[key]
    try {
      val = JSON.stringify(val)
    } catch (e) {
    }
    sign += '' + val
  })
  sign += signSecretKey
  return md5(sign)
}

module.exports = (ctx, next) => {
  const { request, response } = ctx
  let { sign, ...ext } = request.body

  let signSuccess = true
  if (!request.body.timeStamp) {
    signSuccess = false
  }
  if (Date.now() - request.body.timeStamp > 120000) {
    signSuccess = false
  }
  if (sign !== createSign(ext)) {
    signSuccess = false
  }
  if (!signSuccess) {
    response.body = { message: '签名失败' }
    return
  }

  return next()
}
