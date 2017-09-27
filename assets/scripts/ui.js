'use strict'
const store = require('./store')
const songHandles = require('./templates/helpers/songs-listing.handlebars')
const userApi = require('./api')

const onNewSongSuccess = function (data) {
  $('.prompt-div').text('New song created!')
  store.songs = data.songs
}

const onGetSuccess = function (data) {
  console.log('on-get-success')
  // const showSongs = function () {
  console.log('here are songs')
  $('.prompt-div').text('Your songs:')
  const songHTML = songHandles({ songs: data.songs })
  $('.song-bars').text('')
  $('.song-bars').append(songHTML)
  $('.delete-song').on('click', function (event) {
    event.preventDefault()
    $('#prompt-div').text('Song deleted.')
    console.log(this)
    const songId = $(this).parent().data('id')
    console.log('song # ' + songId)
    $(this).parent().remove()
    userApi.deleteSong(songId)
  })
}

const deleteSongSuccess = function (data) {
  $('.song-bars').text('Songs deleted.')
}
// }
// auth UI
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
  $('.creates').show()
  $('#sign-out-change').show()
  $('#songs-index').show()
  $('.show-songs').show()
  store.user = data.user
  store.token = data.user.token
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
  changeFailure,
  onNewSongSuccess,
  onGetSuccess,
  deleteSongSuccess
}
