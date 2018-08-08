import React, { Component } from 'react'
import axios from 'axios'

class UserHome extends Component {
  constructor () {
    super() 
    this.state = {
      zips: [],
      info: []
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount () {
    // axios.get('/api/slcsp').then(res => res.data).then(zips => {
    //   console.log(zips)
    //   this.setState({
    //     zips: zips
    //   })
    // })
  }

  render () { 
    // const zips = this.state.zips
    // console.log('zips2', zips)
    // zips.map(zip => {
    //   const zipcode = Number(zip.zipcode)
    //   console.log('zip', zipcode)
      // axios.put('/api/zips', zipcode).then(res => {
      //   console.log(res)
      //   return res.data 
      // }).then(info => {
      //   console.log('info', info)
        // this.setState({
        //   info: info
        // })
      // })
    // })
  return (
    <div>
        <h3>Welcome, there</h3>
    </div>
  )
}
}

export default UserHome
