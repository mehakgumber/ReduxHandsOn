import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AdminHome from '../adminHome'
import { getAllLocations } from '../../../actions/adminActions'
import { serverName, baseUrl, fetchConfig } from '../../../config/server'

class AddLocation extends Component {
  constructor() {
    super()
    this.state = {
      location: '',
      address: '',
      pincode: ''
    }
  }

  addNewLocation() {
    return fetch(`${serverName}${baseUrl}/admin/addLocation`, {
      ...fetchConfig,
      body: JSON.stringify({
        location: this.state.location,
        address: this.state.address,
        pincode: this.state.pincode
      })
    })
      .then(() => this.props.getAllLocations())
      .then(() => alert('Location Added'))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <AdminHome />
        <div className="container">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            value={this.state.location}
            className="form-control"
            onChange={event => this.setState({ location: event.target.value })}
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            value={this.state.address}
            className="form-control"
            onChange={event => this.setState({ address: event.target.value })}
          />
          <label htmlFor="pincode">PinCode</label>
          <input
            type="number"
            value={this.state.pincode}
            className="form-control"
            onChange={event => this.setState({ pincode: event.target.value })}
          />
          <button
            className="btn btn-primary"
            onClick={() => this.addNewLocation()}
          >
            Add Location
          </button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getAllLocations }, dispatch)
}

export default connect(
  null,
  mapDispatchToProps
)(AddLocation)
