import Api from './api'

export default {
  async createComment(auctionId, text, token) {
    return await Api.sendJson(Api.root + 'comments', {
      auctionId,
      text,
    }, 'POST', token)
  },

  async deleteComment(idComment, token) {
    return await Api.sendJson(Api.root + 'comments/' + idComment, {}, 'DELETE', token)
  }
}