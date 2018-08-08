const router = require('express').Router()
const sequelize = require('sequelize')
const { Zips, Slcsp, Plans } = require('../db')


// -- the following API calls are written in order of execution --


// gets arr of zipcodes from slcsp table
router.get('/slcsp', async (req, res, next) => {
  try {
    const slcspZips = await Slcsp.findAll()
    res.json(slcspZips)
  } catch (err) {
    console.error(err)
  }
})

// gets state and rate_area for arr of zipcodes from zips table
router.put('/zips', async (req, res, next) => {
  const zip = req.body.zipcode
  try {
    const response = await Zips.findAll({
      where: {
        zipcode: zip
      },
      attributes: ['state', 'rate_area']
    })
    res.json(response)
  } catch (err) {
    console.error(err)
  }
})

// gets two plans (using state and rate_area) from plans table, 
// ordered by rate, ascending, only fetches rows with distinct rates
router.put('/plans', async (req, res, next) => {
  const state = req.body.state
  const rate_area = req.body.rate_area
  try {
    const response = await Plans.findAll({
      where: {
        state,
        rate_area,
        metal_level: "Silver"
      },
      limit: 2,
      order: [
        [ 'rate', 'ASC' ]
      ],
      attributes: [
        [ sequelize.fn('DISTINCT', sequelize.col('rate')), 'rate' ]
      ]
    })
    res.json(response)
  } catch (err) {
    console.error(err)
  }
})

// updates rows of slcsp table with the SLCSP rate for each zipcode
router.put('/slcsp', async (req, res, next) => {
  const zipcode = req.body.zipcode
  const rate = req.body.rate
  try {
    const response = await Slcsp.update({
      rate
    }, {
      where: {
        zipcode
      }
    })
    res.json(response)
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
