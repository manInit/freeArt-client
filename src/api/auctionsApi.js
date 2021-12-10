import Api from './api'

export default {
  async getAuction(id) {
    return await Api.fetchJson(Api.root + `auctions/${id}`)
  },

  async getNewAuctions() {
    return await Api.fetchJson(Api.root + 'auctions');
  },

  async getAuctionsCollections(id) {
    return await Api.fetchJson(Api.root + `users/${id}/auctions`)
  },

  async createAuction(idImage, price, token) {
    return await Api.sendJson(Api.root + 'auctions', {
      imageId: +idImage,
      price: +price
    }, 'POST', token)
  }
}