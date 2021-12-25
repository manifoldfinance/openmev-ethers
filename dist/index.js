
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./ethers-provider.cjs.production.min.js')
} else {
  module.exports = require('./ethers-provider.cjs.development.js')
}
