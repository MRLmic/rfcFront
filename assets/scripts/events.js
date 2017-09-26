'use strict'
const setAPIOrigin = ('../../spec/lib/set-api-origin')
const userUi = require('./ui.js')
const config = require('./config')
const getFormFields = require('./../../lib/get-form-fields')
const userApi = require('./api')
const store = require('./store')
const songHandles = require('./templates/helpers/songs-listing.handlebars')

// Song functions
const createSong = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  userApi.newSong(data)
    .then(userUi.onNewSongSuccess)
}
// handlebars
const showSongs = function (data) {
  console.log('here are songs')
  $('.prompt-div').text('Your songs:')
  const showSongHtml = songHandles({ songs: data.songs })
  $('.song-bars').append(songHandles)
  // $('.delete-movie').on('click', function () {
  //   console.log('You have Successfully deleted your movie')
  //   $('#message').text('You have successfully deleted the movie on your to-watch list')
  //   const movieId = $(this).parent().parent().data('id')
  //   console.log('this will delete movie # ' + movieId)
  //   console.log(movieId)
  //   $(this).parent().parent().remove()
  //   api.deleteMovie(movieId)
  // })
}
// auth functions
const signUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  userApi.createUser(data)
    .then(userUi.onSignUpSuccess)
    .then($(this).trigger('reset'))
    .catch(userUi.onSignUpFailure)
}

const signIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  userApi.logIn(data)
    .then(userUi.onSignInSuccess)
    .then($(this).trigger('reset'))
    .catch(userUi.onSignInFailure)
}

const signOut = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  userApi.signOut(data)
    .then(userUi.onSignOutSuccess)
    .catch(userUi.onSignOutFailure)
}

const changePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  userApi.changePassword(data)
    .then(userUi.changeSuccess)
    .then($(this).trigger('reset'))
    .catch(userUi.changeFailure)
}

const addHandlers = function () {
// auth jquery
  $('#sign-up').on('submit', signUp)
  $('#sign-in').on('submit', signIn)
  $('#sign-out').on('submit', signOut)
  $('#changepassword').on('submit', changePassword)
  $('#create-a-song').on('submit', createSong)
}
// auth
module.exports = {
  addHandlers
}
