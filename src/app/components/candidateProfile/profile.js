import React, { Component } from 'react'
import { connect } from 'react-redux'

import { serverName, baseUrl } from '../../config/server'

class Profile extends Component {
  getFileUrl(fileName) {
    return `${serverName}${baseUrl}/candidate/getUploads/${fileName}`
  }

  render() {
    return (
      <div>
        {this.props.profile.isFetching ? (
          <div>Loading...</div>
        ) : (
          <div className="container list-container table-bordered">
            <h1>
              <u>Profile</u>
            </h1>
            <h4>
              <div className="col-sm-2">
                <b>Name:</b>
              </div>
              <div className="col-sm-4">{this.props.profile.name}</div>
            </h4>
            <br />
            <hr />

            <h4>
              <div className="col-sm-2">
                <b>Email: </b>
              </div>
              <div className="col-sm-4">{this.props.profile.email}</div>
            </h4>
            <br />
            <hr />
            <h4>
              <div className="col-sm-2">
                <b>Contact: </b>
              </div>
              <div className="col-sm-6">{this.props.profile.phoneNumber}</div>
            </h4>
            <br />
            <hr />
            <h4>
              <div className="row">
                <div className="col-sm-2">
                  <b>Education:</b>
                </div>
                <div className="col-sm-4">
                  {this.props.profile.education.college},
                  {this.props.profile.education.completionDate}
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
                  {this.props.profile.previousEmployee}
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
                  {this.props.profile.experience} years
                </div>
              </div>
            </h4>

            <br />
            <hr />
            <ul>
              <iframe
                width="90%"
                height="500px"
                src={this.getFileUrl(this.props.profile.resume)}
                title="Resume"
              />
              <iframe
                width="90%"
                height="500px"
                src={this.getFileUrl(this.props.profile.video)}
                title="Video"
              />
            </ul>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.userProfile
})

export default connect(mapStateToProps)(Profile)
