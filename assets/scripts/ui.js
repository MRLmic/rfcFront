'use strict'
const store = require('./store')
const songHandles = require('./templates/helpers/songs-listing.handlebars')
const userApi = require('./api')
const getFormFields = require('./../../lib/get-form-fields')
const userEvents = require('./events')

const onNewSongSuccess = function (data) {
  $('.song-message').text('New song created!').show().fadeOut(2000)
  // const newSong = songHandles({ songs: data.songs.first })
  store.songs = data.songs
  userApi.get()
    .then(onGetSuccess)
  // const newestSong = data.songs.last
  // // sto.songs.last
  // $('.song-bars').append(newestSong)
}

const onNewSongFailure = function (data) {
  $('.prompt-div').text('Something went wrong. Please try again. All song information is required.')
}

const onGetFailure = function (data) {
  $('.prompt-div').text('Something went wrong. Are you sure you\'ve made songs?')
}
const onGetSuccess = function (data) {
  // const showSongs = function () {
  if (data.songs.length > 0) {
  $('.prompt-div').text('All songs:')
  let songHTML = songHandles({ songs: data.songs })
  console.log(data.songs)
  $('.song-bars').text('')
  $('.song-bars').append(songHTML)
  $('.update-song').show()
  $('.update-a-song').hide()
  $('.delete-song').on('click', function (event) {
    event.preventDefault()
    const songId = $(this).parent().data('id')
    console.log('song # ' + songId)
    userApi.deleteSong(songId)
      .then(deleteSongSuccess)
      .catch(deleteSongFailure)
      // .then(() => { $('.prompt-div').text('Song deleted.') })
      // .then(userEvents.showSongs)
      // .catch(() => { $('.prompt-div').text('Action failed. You can only delete your own songs, you sneaky 🐍. For now, we have removed it from your view.') })
      //
      // .then($('.prompt-div').text('Song deleted.'))
      // // .then(coldcall(songId))
      // .catch($('.prompt-div').text('Action failed. You can only delete your own songs, you sneaky 🐍'))
  })
  // const coldcall = function (songId) {
  //   $('.prompt-div').text('Song deleted.')
  //   console.log(songId)
  //   $('h4').attr('id', songId).remove()
  // }
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
      // userApi.get()
      userApi.patchSong(data, songId)
      // let songHTML = songHandles({ songs: data.songs })
        // .then(() => {$('.prompt-div').text('Song Updated.')
        //   }
        .then(updateSuccess)
        // () => {
        // $('.update-a-song').text('Song updated! Click Show All Songs to see changes.')
        // }
        .catch(coldCall)
      // .then(userApi.get())
      // .then($('.update-a-song').text('Song updated! Click Show All Songs to see changes.'))
      // .then($('.prompt-div').text('Song Updated.'))
      // .then($(this).trigger('reset'))
      // .catch($('.prompt-div').text('Action failed. You can only update your own songs, you sneaky 🐍'))
    })
  })
} else {
  $('.song-bars').text('')
  $('.song-message').text('You have no songs.').show().fadeOut(2000)
}
}
const updateSuccess = function () {
  $('.song-message').text('Song updated!').show().fadeOut(2000)
  userApi.get()
    .then(onGetSuccess)
}
const deleteSongSuccess = function () {
  $('.song-message').text('Song deleted.').show().fadeOut(2000)
  console.log('delete success')
  userApi.get()
    .then(onGetSuccess)
}
const deleteSongFailure = function () {
  $('.prompt-div').text('Action failed.')
}
const coldCall = function () { $('.prompt-div').text('Action failed. You can only update your own songs, you sneaky 🐍') }

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
  $('.prompt-div').text('Enter song info to add a song, or click Show All Songs to see all of your songs.')
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
  $('.prompt-div').text('Oops, sign in failed. Please try again.')
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
  $('#password-message').text('Password changed.').show().fadeOut(2000)
}

const changeFailure = function (data) {
  $('#password-message').text('fail. try again').show().fadeOut(2000)
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
  onNewSongFailure,
  onGetFailure
}
