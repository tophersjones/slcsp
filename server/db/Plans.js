const Sequelize = require('sequelize')
const db = require('./db')

const Plans = db.define('plans', {
  plan_id: {
    type: Sequelize.STRING(14),
    primaryKey: true
  },
  state: Sequelize.STRING(2),
  metal_level: Sequelize.STRING,
  rate: Sequelize.DECIMAL,
  rate_area: Sequelize.INTEGER,
}, {
  timestamps: false
})

module.exports = Plans