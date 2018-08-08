const Sequelize = require('sequelize')
const db = require('./db')

const Zips = db.define('zips', {
  zipcode: {
    type: Sequelize.INTEGER,
  },
  state: Sequelize.STRING(2),
  county_code: Sequelize.INTEGER,
  name: Sequelize.STRING,
  rate_area: Sequelize.INTEGER
}, {
  timestamps: false
})

module.exports = Zips