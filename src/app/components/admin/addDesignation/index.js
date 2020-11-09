import React, { Component } from 'react'

import AdminHome from '../adminHome'
import { connect } from 'react-redux'
import { serverName, baseUrl, fetchConfig } from '../../../config/server'
import { getAllCategories } from '../../../actions/adminActions'
import { bindActionCreators } from 'redux'

class AddDesignation extends Component {
  constructor() {
    super()
    this.state = {
      category: '',
      designation: ''
    }
  }

  addDesignation() {
    return fetch(`${serverName}${baseUrl}/admin/addDesignation`, {
      ...fetchConfig,
      body: JSON.stringify({
        category: this.state.category,
        designation: this.state.designation
      })
    })
      .then(() => this.props.getAllCategories())
      .then(() => alert('Designation Added'))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <AdminHome />
        <div className="container">
          <label htmlFor="category">Category</label>
          <select
            onChange={event => this.setState({ category: event.target.value })}
            className="form-control"
          >
            <option value="" disabled>
              Choose One
            </option>
            {this.props.categories.map((data, index) => (
              <option key={index} value={data.category}>
                {data.category}
              </option>
            ))}
          </select>
          <label htmlFor="designation">Designation</label>
          <input
            type="text"
            className="form-control"
            value={this.state.designation}
            onChange={event =>
              this.setState({ designation: event.target.value })
            }
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.addDesignation()}
          >
            Add Designation
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categoryList
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getAllCategories }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDesignation)
