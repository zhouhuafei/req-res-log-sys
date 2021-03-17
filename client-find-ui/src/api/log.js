import request from '@/utils/request'

export default {
  async getList (data) {
    return await request({ url: '/log', method: 'get', data })
  },
  async postList (data) {
    return await request({ url: '/log', method: 'post', data })
  }
}
