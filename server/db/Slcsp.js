const Sequelize = require('sequelize')
const db = require('./db')

const Slcsp = db.define('slcsp', {
  zipcode: {
    type: Sequelize.TEXT,
  },
  rate: {
    type: Sequelize.TEXT,
    defaultValue: null
  }
}, {
  timestamps: false
})

module.exports = Slcsp