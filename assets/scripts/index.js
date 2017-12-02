'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./events')

// logic
$(() => {
  setAPIOrigin(location, config)
  authEvents.addHandlers()
  $('.song-bars').hide()
  $('#sign-out').hide()
  $('.form-wrapper').show()
  $('#changepassword').hide()
  $('.creates').hide()
  $('#sign-out-change').hide()
  $('#songs-index').hide()
  $('.show-songs').hide()
  $('#deletes').hide()
  $('.collapse').collapse()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
