import React, { Component } from 'react'
import axios from 'axios'
import GetSilverPlans from './GetSilverPlans'

/* 
  this.state.zipData =
[
  {67118: [
    {state: 'KS', rate_area: 6},
    {state: 'KS', rate_area: 6},
    {state: 'KS', rate_area: 6},
    {state: 'KS', rate_area: 6}
    ]
  },
  etc...
]
*/

export default class GetZipData extends Component {
  constructor () {
    super()
    this.state = {
      zipData: []
    }
  }

  componentDidMount = () => {
    this.fetchZipData()
  }

  fetchZipData = () => {
    const zips = this.props.zips
    zips.map(zip => {
      const zipcode = zip.zipcode
      axios.put('/api/zips', { zipcode }).then(res => {
        return res.data 
      }).then(info => {
        this.setState((prevState) => ({ zipData: prevState.zipData.concat(
          {[zipcode]: info}) 
        }))
      })
    })
  }

  render() {
    if (this.state.zipData.length === this.props.zips.length) {
      console.log(this.state)
      return (
          <GetSilverPlans zipData={this.state.zipData} />
      )
    } else {
      return null
    }
  }
}
