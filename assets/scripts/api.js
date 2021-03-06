const config = require('./config')
const store = require('./store')

const newSong = function (data) {
  console.log(data)
  return $.ajax({
    url: config.apiOrigin + '/songs',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.token
    },
    data
  })
}

const get = function () {
  return $.ajax({
    url: config.apiOrigin + '/songs',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.token
    }
  })
}

const deleteSong = function (songId) {
  return $.ajax({
    url: config.apiOrigin + '/songs/' + songId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.token
    }
  })
}

const patchSong = function (data, songId) {
  return $.ajax({
    url: config.apiOrigin + '/songs/' + songId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.token
    },
    data
  })
}
// auth api functions
const createUser = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

const logIn = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
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
  changePassword,
  newSong,
  get,
  deleteSong,
  patchSong
}
