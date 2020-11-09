import React, { Component } from 'react'
import { connect } from 'react-redux'

import AdminHome from '../adminHome'

class AddJob extends Component {
  constructor() {
    super()
    this.state = {
      category: '',
      designation: '',
      paySalary: '',
      location: '',
      bondDetail: '',
      experienceYears: '',
      description: '',
      lastDate: '',
      skillsRequired: [],
      designations: [],
      curSkill: ''
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

  addSkill(e) {
    e.preventDefault()
    let skillsRequired = this.state.skillsRequired
    skillsRequired.push({ skillName: this.state.curSkill })
    this.setState({ skillsRequired })
  }

  removeSkill(e) {
    e.preventDefault()
    let skillsRequired = this.state.skillsRequired
    if (skillsRequired.length > 0) skillsRequired.pop()
    this.setState({ skillsRequired })
  }

  render() {
    const { designations } = this.state
    console.log(this.props.locations)
    return (
      <div>
        <AdminHome />
        <form className="container">
          <div className="form-group">
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
                this.setState({ designation: event.target.value })
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
            <label htmlFor="pay">PaySalary</label>
            <input
              type="number"
              id="pay"
              className="form-control"
              onChange={event =>
                this.setState({ paySalary: event.target.value })
              }
            />
            <label htmlFor="last">Last Date</label>
            <input
              type="date"
              id="last"
              min={new Date().toISOString().substr(0, 10)}
              className="form-control"
              onChange={event =>
                this.setState({ lastDate: event.target.value })
              }
            />
            <label htmlFor="bond">Bond Detail</label>
            <input
              type="number"
              id="bond"
              className="form-control"
              onChange={event =>
                this.setState({ bondDetail: event.target.value })
              }
            />
            <label htmlFor="exp">Experience Required</label>
            <input
              type="number"
              id="exp"
              className="form-control"
              onChange={event =>
                this.setState({ experienceYears: event.target.value })
              }
            />
            <label htmlFor="location">Location</label>
            <select
              onChange={event =>
                this.setState({ location: event.target.value })
              }
              className="form-control"
            >
              <option value="">Choose One</option>
              {this.props.locations.map((value, index) => (
                <option key={index} value={value.location}>
                  {value.location}
                </option>
              ))}
            </select>
            <label htmlFor="skills">Skills</label>
            <input
              className="form-control"
              id="skills"
              onChange={event =>
                this.setState({ curSkill: event.target.value })
              }
              type="text"
            />
            {this.state.skillsRequired.map(value => (
              <span className="alert alert-info">{value.skillName}</span>
            ))}
            <button
              className="btn btn-primary"
              onClick={event => this.addSkill(event)}
            >
              Add skill
            </button>
            <button
              className="btn btn-danger"
              onClick={event => this.removeSkill(event)}
            >
              Remove Skill
            </button>
            <br />
            <br />
            <button
              className="btn btn-primary"
              onClick={event => this.addNewJob(event)}
            >
              Add Job
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categoryList,
  locations: state.categories.locations
})

export default connect(mapStateToProps)(AddJob)
