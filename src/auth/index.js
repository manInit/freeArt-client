import Api from '../api'

export default class Auth {

  static login(login, password) {
    return Api.login(login, password).then(data => {
      if (data.status === 403) {
        throw new Error(data.error)
      }

      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.id)
        localStorage.setItem('userRole', data.role)

        return {
          status: 'success',
          id: data.id,
          role: data.role ?? null
        }
      }
    })
  }

  static logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }

  static register(login, password) {
    return Api.register(login, password).then(data => {
      if (data.status === 400) {
        throw new Error(data.error)
      }

      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.id)
        localStorage.setItem('userRole', data.role)

        return {
          status: 'success',
          id: data.id,
          role: data.role ?? null
        }
      }

    })
  }
}