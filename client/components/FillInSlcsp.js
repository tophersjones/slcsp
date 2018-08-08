import React, { Component } from 'react'
import axios from 'axios'

/*
  this.state.axiosResponseConfArr =
  [ 1, 1, 1]

  All this ^ does is act as a counter of successful Axios responses
*/

export default class FillInSlcsp extends Component {
  constructor() {
    super()
    this.state = {
      axiosResponseConfArr: [],
      count: 0
    }
  }
  
  componentDidMount = () => {
    this.populateSlcspTable()
  }

  populateSlcspTable = () => {
    const fillData = this.props.slcsp
    const filling = fillData.filter(zip => {
      const zipcode = Object.keys(zip)[0]
      return zip[zipcode] !== undefined
    })
    this.setState({
      count: filling.length
    })
    filling.map(zip => {
      const zipcode = String(Object.keys(zip))
      if (zip[zipcode]) {
        const rate = Number(zip[zipcode].rate)
        axios.put('api/slcsp', { zipcode, rate }).then(res => {
          return res.data
        }).then(info => {
          this.setState(prevState => ( {axiosResponseConfArr: prevState.axiosResponseConfArr.concat(
            info )} 
          ))
        })
      }
    })
  }

  render () {
    if (this.state.count && this.state.count === this.state.axiosResponseConfArr.length) {
      console.log(this.state)
      return (
        <div>
          Slcsp table seeded...
        </div>
      )
    } else {
      return (
        <div>
          Updating db..
        </div>
      )
    }
  }
}