import Api from './api'

export default {
  async makeBid(auctionId, price, token) {
    return await Api.sendJson(Api.root + 'bids', {
      auctionId,
      price: +price,
    }, 'POST', token)
  }
}