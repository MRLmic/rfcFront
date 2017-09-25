'use strict'
const store = require('./store')

const onSignUpSuccess = function (data) {
  $('.prompt-div').text('User created! Please sign in to play.')}

module.exports = {
  onSignUpSuccess
}
