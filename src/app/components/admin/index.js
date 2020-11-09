import React, { Component } from 'react'
import AdminHome from './adminHome'

class Admin extends Component {
  componentDidMount() {
    console.log('Admin mounted')
  }

  render() {
    return (
      <div>
        <AdminHome />
      </div>
    )
  }
}

export default Admin
