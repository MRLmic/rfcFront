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
const addHandlers = function () {
// auth jquery
$('#sign-up').on('submit', signUp)
}
// auth
module.exports = {
  addHandlers
}
