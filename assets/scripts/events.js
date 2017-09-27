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
    .then($(this).trigger('reset'))
    .catch(userUi.onNewSongFailure)
}

const show = function (event) {
  event.preventDefault()
  userApi.get()
    .then(userUi.onGetSuccess)
}

// const deleteSongs = function (event) {
//   event.preventDefault()
//   $(".checkbox input:checked").parent().parent().remove()
//   const songId = $(".checkbox input:checked").closest('h4').data('id')
//   console.log(songId)
  //   const parentlist = []
  //   for (var i = 0; i < list.length; i++) {
  //   parentlist.push(list[i].parentNode.id)
  // }
  // const songId = $(this).parent().parent().data('id')
  // userApi.deleteSong(songId)
  //   .then(userUi.deleteSongSuccess)
// }

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
  $('#songs-index').on('submit', show)
}
// auth
module.exports = {
  addHandlers
}
