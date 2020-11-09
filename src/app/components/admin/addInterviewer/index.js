import React, { Component } from 'react'
import { connect } from 'react-redux'

import AdminHome from '../adminHome'
import { serverName, baseUrl, fetchConfig } from '../../../config/server'

class AddInterviewer extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      category: '',
      designations: [],
      selectedDesignation: ''
    }
  }

  handleCategoryChange(event) {
    this.setState({ category: event.target.value }, () => {
      console.log(this.state)
      let designations = this.props.categories.find(
        value => value.category === this.state.category
      )
      console.log('list', designations)
      this.setState({ designations }, () => {
        console.log(this.state.designations.designation)
      })
    })
  }

  addNewInterviewer(e) {
    e.preventDefault()
    return fetch(`${serverName}${baseUrl}/admin/addInterviewer`, {
      ...fetchConfig,
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        category: this.state.category,
        designation: this.state.selectedDesignation
      })
    })
      .then(() => alert('Added new Interviewer'))
      .catch(err => console.log(err))
  }

  render() {
    const { designations } = this.state
    return (
      <div>
        <AdminHome />
        <form className="container">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={event => this.setState({ email: event.target.value })}
              id="email"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={event =>
                this.setState({ password: event.target.value })
              }
              id="password"
            />
            <label htmlFor="category">Category</label>
            <select
              onChange={event => this.handleCategoryChange(event)}
              className="form-control"
            >
              <option value="">Choose One</option>
              {this.props.categories.map((data, index) => (
                <option key={index} value={data.category}>
                  {data.category}
                </option>
              ))}
            </select>
            <label htmlFor="designation">Designation</label>
            <select
              onChange={event =>
                this.setState({ selectedDesignation: event.target.value })
              }
              id="designation"
              className="form-control"
            >
              <option value="">Choose One</option>
              {designations.designation
                ? designations.designation.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))
                : null}
            </select>
            <button
              className="btn btn-primary"
              onClick={event => this.addNewInterviewer(event)}
            >
              Add Interviewer
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categoryList
})

export default connect(mapStateToProps)(AddInterviewer)
