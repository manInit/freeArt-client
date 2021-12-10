import Api from './api'

export default {
  async login(login, password) {
    return await Api.sendJson(Api.root + 'login', {
      login,
      password
    })
  },

  async register(login, password) {
    return await Api.sendJson(Api.root + 'register', {
      login,
      password
    })
  },

  async getUser(id) {
    return await Api.fetchJson(Api.root + `users/${id}`)
  },

  async setPoints(points, token) {
    return await Api.sendJson(Api.root + 'users/points', {
      points
    }, 'POST', token)
  },

  async getPoints(id) {
    return await Api.fetchJson(Api.root + `users/${id}/points`)
  },

  async getTopUsers() {
    return await Api.fetchJson(Api.root + 'users/top')
  },

  async uploadAvatar(file, token) {
    const formData = new FormData()

    formData.append('image', file)

    return await Api.sendFormData(Api.root + 'users/avatar', formData, token)
  },

  async updateDescription(id, about, token) {
    return await Api.sendJson(Api.root + 'users/about', {
      about,
      id
    }, 'POST', token)
  },

  async getFollowers(id) {
    return await Api.fetchJson(Api.root + `users/${id}/followers`)
  },

  async getFollowing(id) {
    return await Api.fetchJson(Api.root + `users/${id}/following`)
  },

  async follow(id, token) {
    return await Api.sendJson(Api.root + 'users/follow', {
      id
    }, 'POST', token)
  },

  async unfollow(id, token) {
    return await Api.sendJson(Api.root + 'users/follow', {
      id
    }, 'DELETE', token)
  },

  async followCheck(id, idCurrentUser) {
    return await Api.fetchJson(Api.root + `users/${id}/followers?check=${idCurrentUser}`)
  },

  async followingNews(token) {
    return await Api.fetchJson(Api.root + 'users/following', token)
  },

  async getAuctionsParticipate(token) {
    return await Api.fetchJson(Api.root + 'users/auctions', token)
  }
}