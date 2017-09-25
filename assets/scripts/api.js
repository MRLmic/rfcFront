const config = require('./config')
const store = require('./store')

const createUser = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-up/',
    method: 'POST',
    data
  })
}

const logIn = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in/',
    method: 'POST',
    data
  })
}

const signOut = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const changePassword = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + store.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.token
    },
    data
  })
}

module.exports = {
  createUser,
  logIn,
  signOut,
  changePassword
}
