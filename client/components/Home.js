import React, { Component } from 'react'
import axios from 'axios'
import GetZipData from './GetZipData'

/* 
  this.state.zips =
[
  {id: 1, zipcode: "64148", rate: null},
  {id: 2, zipcode: "67118", rate: null},
  etc...
]
*/

class UserHome extends Component {
  constructor () {
    super() 
    this.state = {
      zips: [],
    }
  }

  componentDidMount = () => {
    this.fetchZips()
  }
  
  fetchZips = () => {
    axios.get('/api/slcsp').then(res => res.data).then(zips => {
      this.setState({
        zips: zips
      })
    })
  }
  
  render () { 
    if (this.state.zips.length) {
      console.log('this.state', this.state)
      return (
        <div>
          <h3>Hello!</h3>
          <GetZipData zips={this.state.zips} />
        </div>
      )
    } else {
      return null
    }
  }
}

export default UserHome
