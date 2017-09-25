const userUi = require('./ui.js')
const getFormFields = require('./../../lib/get-form-fields')
const userApi = require('./api.js')
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
    .then(userUi.signOutSuccess)
    .catch(userUi.signOutFailure)
}
const addHandlers = function () {
// auth jquery
  $('#sign-up').on('submit', signUp)
  $('#sign-in').on('submit', signIn)
  $('#sign-out').on('submit', signOut)
}
// auth
module.exports = {
  addHandlers
}
