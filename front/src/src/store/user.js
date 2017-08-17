export default {
  user: JSON.parse(window.sessionStorage.getItem('user')),
  IsLoggedIn () {
    return (this.user !== null)
  },
  Set (key, val) {
    window.sessionStorage.setItem(key, JSON.stringify(val))
  },
  Get (key) {
    if (typeof key === 'string') {
      return JSON.parse(window.sessionStorage.getItem(key))
    }
    return this.user
  },
  Unset (key) {
    window.sessionStorage.removeItem(key)
  },
  Login (user) {
    this.user = user
    window.sessionStorage.setItem('user', JSON.stringify(user))
  },
  Logout () {
    this.user = null
    window.sessionStorage.removeItem('user')
  }
}
