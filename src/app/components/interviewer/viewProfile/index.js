import React, { Component } from 'react'

import { serverName, baseUrl } from '../../../config/server'
import InterviewerHome from '../InteviewerHome'

class ViewProfile extends Component {
  constructor() {
    super()
    this.state = {
      profile: '',
      loading: true
    }
  }

  componentWillMount() {
    let candidateId = this.props.match.params.id
    console.log('view profile mounted')
    fetch(`${serverName}${baseUrl}/candidate/${candidateId}`)
      .then(res => res.json())
      .then(resJson => this.setState({ profile: resJson }))
  }

  componentWillUpdate() {
    if (this.state.loading) {
      this.setState({ loading: false })
    }
  }

  getFileUrl(fileName) {
    return `${serverName}${baseUrl}/candidate/getUploads/${fileName}`
  }

  render() {
    return this.state.loading ? (
      <div>Loading...</div>
    ) : (
      <div>
        <InterviewerHome />
        <div className="container list-container table-bordered">
          <h1>
            <u>Profile</u>
          </h1>
          <h4>
            <div className="col-sm-2">
              <b>Name:</b>
            </div>
            <div className="col-sm-4">{this.state.profile.name}</div>
          </h4>
          <br />
          <hr />

          <h4>
            <div className="col-sm-2">
              <b>Email: </b>
            </div>
            <div className="col-sm-4">{this.state.profile.email}</div>
          </h4>
          <br />
          <hr />
          <h4>
            <div className="col-sm-2">
              <b>Contact: </b>
            </div>
            <div className="col-sm-6">{this.state.profile.phoneNumber}</div>
          </h4>
          <br />
          <hr />
          <h4>
            <div className="row">
              <div className="col-sm-2">
                <b>Education:</b>
              </div>
              <div className="col-sm-4">
                {this.state.profile.education.college},
                {this.state.profile.education.completionDate}
              </div>
            </div>
          </h4>
          <br />
          <hr />
          <h4>
            <div className="row">
              <div className="col-sm-2">
                <b>Previous Employee:</b>
              </div>
              <div className="col-sm-5">
                {this.state.profile.previousEmployee}
              </div>
            </div>
          </h4>
          <br />
          <hr />

          <h4>
            <div className="row">
              <div className="col-sm-2">
                <b>Experience: </b>
              </div>
              <div className="col-sm-5">
                {this.state.profile.experience} years
              </div>
            </div>
          </h4>

          <br />
          <hr />
          <ul>
            <iframe
              width="90%"
              height="500px"
              src={this.getFileUrl(this.state.profile.resume)}
              title="Resume"
            />
            <iframe
              width="90%"
              height="500px"
              src={this.getFileUrl(this.state.profile.video)}
              title="Video"
            />
          </ul>
        </div>
      </div>
    )
  }
}

export default ViewProfile
