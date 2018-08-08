import React, { Component } from 'react'
import axios from 'axios'
import FillInSlcsp from './FillInSlcsp'

/* 

checkForMultipleRateAreas()
if mutiple rate_areas found for one zipcode:
  
this.props.zipData = 
  [
    {54923: "Multiple rate_areas found for this zipcode"},
    etc...
  ]

fetchTwoSilverPlansKeepSecond()
if there are less than two plans found for given data, value for zip will be undefined
if success, value for zipcode will be rate object with SLCSP

this.props.zipData =
  [
    {40813: undefined},
    {79168: { rate: "243.68" }}
    etc...
  ]
*/

export default class GetSilverPlans extends Component {
  constructor() {
    super()
    this.state = {
      planData: [],
      count: 0
    }
  }

  componentDidMount = () => {
    this.checkForMultipleRateAreas()
  }

  checkForMultipleRateAreas = () => {
    const zipData = this.props.zipData
    for (let i = 0; i < zipData.length; i++) {
      const zipObj = zipData[i]
      const zipcode = Object.keys(zipObj)[0]
      const zipArr = zipObj[zipcode]
      for (let j = 0; j < zipArr.length; j++) {
        const firstRateArea = zipArr[0].rate_area
        const dataObj = zipArr[j]
        let rateArea = dataObj.rate_area
        if (zipArr.length > 1 && firstRateArea !== rateArea) {
            zipObj[zipcode] = "Multiple rate_areas found for this zipcode"
            break
        }
      }
    }
    this.fetchTwoSilverPlansKeepSecond(zipData)
  }
   
  fetchTwoSilverPlansKeepSecond = (zipData) => {
    for (let i = 0; i < zipData.length; i++) {
      const zipObj = zipData[i]
      const zipcode = Object.keys(zipObj)[0]
      const zipArr = zipObj[zipcode]
      if (Array.isArray(zipArr)) {
        const state = zipArr[0].state
        const rate_area = zipArr[0].rate_area
        axios.put('/api/plans', { state, rate_area }).then(res => {
          return res.data
        }).then(info => {
          this.setState(prevState => ({planData: prevState.planData.concat(
            {[zipcode]: info[1]})
        }))
      })
    } else {
        this.setState((prevState) => {
          return { count: prevState.count + 1 }
        })
      }
    }
  }

  render() {
    if (this.state.count + this.state.planData.length === this.props.zipData.length) {
      console.log(this.state)
      return (
          <FillInSlcsp slcsp={this.state.planData} />
      )
  } else {
    return null
    }
  }
}