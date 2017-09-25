'use strict'
const store = require('./store')

const onSignUpSuccess = function (data) {
  $('.prompt-div').text('User created! Please sign in to play.')
}

const onSignUpFailure = function (data) {
  $('.prompt-div').text('Oops, something went wrong. Please try again.')
}

const onSignInSuccess = function (data) {
  $('.form-wrapper').hide()
  $('.prompt-div').text('Can you guess whether these songs are covers or original recordings?')
  $('.song-bars').show()
  $('#sign-out').show()
  $('#changepassword').show()
  store.user = data.user
}

const onSignInFailure = function (data) {
  $('prompt-div').text('Oops, something went wrong. Please try again.')
}

const onSignOutSuccess = function (data) {
  $('.prompt-div').text('Signed out. Please sign up or sign in to play.')
  $('.song-bars').hide()
  $('#sign-up').show()
  $('#sign-in').show()
  $('#changepassword').hide()
}

const onSignOutFailure = function (data) {
  $('.prompt-div').text('Something went wrong. Please try again.')
}

const changeSuccess = function (data) {
  $('.prompt-div').text('Password changed.')
}

const changeFailure = function (data) {
  $('.turn').text('fail. try again')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  changeSuccess,
  changeFailure
}
