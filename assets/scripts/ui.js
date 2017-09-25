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
  store.user = data.user
  store.token = data.user.token
  store.id = data.user.id
}

const onSignInFailure = function (data) {
  $('prompt-div').text('Oops, something went wrong. Please try again.')
}
module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure
}
