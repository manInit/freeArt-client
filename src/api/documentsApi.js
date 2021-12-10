import Api from './api'

export default {
  async getUsersRating(token) {
    return await Api.fetchJson(Api.root + 'users/rating', token)
  },

  async getTransaction(token) {
    return await Api.fetchJson(Api.root + 'auctions/transaction', token)
  },

  async getImageHistory(token) {
    return await Api.fetchJson(Api.root + 'images/history', token)
  }
}