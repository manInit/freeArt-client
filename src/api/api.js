const host = 'http://192.168.207.203:8080/'

const safetyJson = async response => {
  if (response.ok) {
    try {
      return await response.json()
    } catch(e) {
      return Promise.resolve()
    }
  } else {
    throw new Error(response.status.toString())
  }
}

export default {
  root: host + 'api/',
  imageUrl: host + 'uploads/images/',
  avatarUrl: host + 'uploads/avatars/',

  async fetchJson(url, token) {
    let addHeaders = token ? {'Authorization': 'Bearer ' + token}  : {}


    const response = await fetch(url, {
      headers: {
        ...addHeaders
      }
    })

    return safetyJson(response)
  },

  async sendJson(url, data, method = 'POST', token = null) {
    let addHeaders = token ? {'Authorization': 'Bearer ' + token}  : {}

    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
        ...addHeaders
      }
    })

    return safetyJson(response)
  },

  async sendFormData(url, formData, token = null) {
    let addHeaders = token ? {'Authorization': 'Bearer ' + token}  : {}

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        ...addHeaders
      }
    })

    return safetyJson(response)
  }
}