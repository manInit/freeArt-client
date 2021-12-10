import Api from './api'

export default {
  async getImage(id) {
    return await Api.fetchJson(Api.root + `images/${id}`);
  },

  async getModerationImage(id, token) {
    return await Api.fetchJson(Api.root + `images/${id}`, token)
  },

  async setValid(id, token) {
    return await Api.sendJson(Api.root + 'images/validate', { id: +id }, 'POST', token)
  },

  async getNextInvalidIdImage(token) {
    return await Api.fetchJson(Api.root + 'images/moderation/next', token)
  },

  async getUsersInvalidImage(id, token) {
    return await Api.fetchJson(Api.root + `users/${id}/moderation`, token)
  },

  async deleteImage(id, token) {
    return await Api.sendJson(Api.root + `images/${id}`, {}, 'DELETE', token)
  },

  async getNewImages() {
    return await Api.fetchJson(Api.root + 'images');
  },

  async uploadImage(title, description, tags, file, token) {
    const formData = new FormData()

    formData.append('image', file)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('tags', tags ?? '')

    return await Api.sendFormData(Api.root + 'images', formData, token)
  },

  async getUserCollections(id) {
    return await Api.fetchJson(Api.root + `users/${id}/collections`)
  },

  async getModerationImages(token) {
    return await Api.fetchJson(Api.root + 'images/moderation', token)
  },
}
