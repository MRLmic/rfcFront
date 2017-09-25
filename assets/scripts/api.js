const config = require('./config')
const store = require('./store')

const createUser = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-up/',
    method: 'POST',
    data
  })
}
module.exports = {
  createUser
}
