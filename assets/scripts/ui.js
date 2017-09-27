'use strict'
const store = require('./store')
const songHandles = require('./templates/helpers/songs-listing.handlebars')
const userApi = require('./api')
const getFormFields = require('./../../lib/get-form-fields')
const userEvents = require('./events')

const onNewSongSuccess = function (data) {
  $('.prompt-div').text('New song created! Click Show All Songs to see.')
  // const newSong = songHandles({ songs: data.songs.first })
  store.songs = data.songs
  // const newestSong = data.songs.last
  // // sto.songs.last
  // $('.song-bars').append(newestSong)
}

const onNewSongFailure = function(data) {
  $('.prompt-div').text('Something went wrong. Please try again. All song information is required.')
}
const onGetSuccess = function (data) {
  // const showSongs = function () {
  console.log('here are songs')
  $('.prompt-div').text('Your songs:')
  const songHTML = songHandles({ songs: data.songs })
  $('.song-bars').text('')
  $('.song-bars').append(songHTML)
  $('.update-song').show()
  $('.update-a-song').hide()
  $('.delete-song').on('click', function (event) {
    event.preventDefault()
    console.log(this)
    const songId = $(this).parent().data('id')
    console.log('song # ' + songId)
    $(this).parent().remove()
    userApi.deleteSong(songId)
      .then($('.prompt-div').text('Song deleted.'))
      .catch($('.prompt-div').text('Action failed. You can only delete your own songs, you sneaky 🐍'))
  })
  $('.update-song').on('click', function (event) {
    event.preventDefault()
    $(this).closest('h4').append('<form class="update-a-song">Need to update something about your song? No problem! Enter the new information here.<div class="form-group"><input type="text" name="song[title]" id="new_title" placeholder="Title"><input type="text" name="song[artist]" id="new_artist" placeholder="Artist"><input type="checkbox" name="song[written_by]" id="original_check" value="true" checked><label for="chk_email_alerts">Song originally recorded by this artist?</label><input type="text" name="song[year]" id="new_year" placeholder="Year Recorded"><button type="submit" class="btn btn-default">Update Song</button></div></form>')
    $(".update-a-song").on('submit', function (event) {
      event.preventDefault()
      $('.prompt-div').text('Song updated.')
      const songId = $(this).closest('h4').data('id')
      console.log(songId)
      const data = getFormFields(this)
      console.log(data)
      userApi.patchSong(data, songId)
        .then($('.update-a-song').text('Song updated! Click Show All Songs to see changes.'))
        .then($('.prompt-div').text('Song Updated.'))
        .then($(this).trigger('reset'))
        // .catch($('.prompt-div').text('Action failed. You can only update your own songs, you sneaky 🐍'))
    })
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
  $('.log-in-stuff').hide()
  $('.prompt-div').text('Enter song info to add a song, or click Show All Songs to see all the songs.')
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
  $('.prompt-div').text('Oops, something went wrong. Please try again.')
}

const onSignOutSuccess = function (data) {
  $('.prompt-div').text('Signed out. Please sign up or sign in to use the app.')
  $('.song-bars').hide()
  $('#sign-up').show()
  $('#sign-in').show()
  $('#changepassword').hide()
  $('.creates').hide()
  $('.show-songs').hide()
  $('#sign-out-change').hide()
  $('.log-in-stuff').show()
  $('.song-bars').text('')
}

const onSignOutFailure = function (data) {
  $('.prompt-div').text('Something went wrong. Please try again.')
}

const changeSuccess = function (data) {
  $('.prompt-div').text('Password changed.')
}

const changeFailure = function (data) {
  $('.prompt-div').text('fail. try again')
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
  deleteSongSuccess,
  onNewSongFailure
}
