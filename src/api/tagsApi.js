import Api from './api'

export default {
  async getAllTags() {
    return await Api.fetchJson(Api.root + 'tags');
  },

  async deleteTag(id, token) {
    return await Api.sendJson(Api.root + 'tags', {
      id
    }, 'DELETE', token)
  },

  async createTag(tag, token) {
    return await Api.sendJson(Api.root + 'tags', {
      tag
    }, 'POST', token)
  }
}