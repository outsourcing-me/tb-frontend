var os = require('os')
var chalk = require('chalk')

module.exports = function getIPv4() {
  var interfaces = os.networkInterfaces()
  var addresses = []
  for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
      var address = interfaces[k][k2]
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push(address.address)
      }
    }
  }

  console.log(chalk.green('get IPv4: ' + addresses))

  return addresses
}
