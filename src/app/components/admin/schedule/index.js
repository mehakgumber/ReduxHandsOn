import React, { Component } from 'react'
import { connect } from 'react-redux'
import AdminHome from '../adminHome'
import { serverName, baseUrl, fetchConfig } from '../../../config/server'

class Schedule extends Component {
  constructor() {
    super()
    this.state = {
      jobId: '',
      candidateId: '',
      interviewerId: '',
      date: '',
      time: '',
      allCandidatesForJobId: [],
      history: []
    }
  }

  handleJobChange(event) {
    this.setState({ jobId: event.target.value }, () => {
      fetch(`${serverName}${baseUrl}/job/candidatesForJobId`, {
        ...fetchConfig,
        body: JSON.stringify({ param: this.state.jobId })
      })
        .then(res => res.json())
        .then(resJson => this.setState({ allCandidatesForJobId: resJson }))
        .catch(err => console.log(err))
    })
  }

  chooseCandidate(event) {
    this.setState({ candidateId: event.target.value }, () => {
      fetch(
        `${serverName}${baseUrl}/schedule/${this.state.jobId}/${
          this.state.candidateId
        }`
      )
        .then(res => res.json())
        .then(resJson => this.setState({ history: resJson }))
        .catch(err => console.log(err))
    })
  }

  scheduleInterview() {
    return fetch(`${serverName}${baseUrl}/admin/schedule`, {
      ...fetchConfig,
      body: JSON.stringify({ ...this.state })
    })
      .then(() => alert('interview scheduled'))
      .catch(err => console.log(err))
  }

  markSelection() {
    return fetch(`${serverName}${baseUrl}/admin/changeScheduleStatus`, {
      ...fetchConfig,
      body: JSON.stringify({
        candidateId: this.state.candidateId,
        jobId: this.state.jobId,
        status: 'Selected'
      })
    })
      .then(() => alert('Selected'))
      .catch(err => console.log(err))
  }

  markRejection() {
    return fetch(`${serverName}${baseUrl}/admin/changeScheduleStatus`, {
      ...fetchConfig,
      body: JSON.stringify({
        candidateId: this.state.candidateId,
        jobId: this.state.jobId,
        status: 'Rejected'
      })
    })
      .then(() => alert('Rejected'))
      .catch(err => console.log(err))
  }

  render() {
    const { allCandidatesForJobId, history } = this.state
    return (
      <div>
        <AdminHome />
        <div className="form-group container">
          <label for="job">Job</label>
          <select
            onChange={event => this.handleJobChange(event)}
            className="form-control"
          >
            <option value="">Choose One</option>
            {this.props.jobs.map((value, index) => (
              <option key={index} value={value._id}>
                {value.category} {value.designation}
              </option>
            ))}
          </select>
          <label for="candidates">Candidates</label>
          <select
            onChange={event => this.chooseCandidate(event)}
            className="form-control"
          >
            <option value="">Choose One</option>
            {allCandidatesForJobId.map(value => (
              <option value={value.candidateId._id}>
                {value.candidateId.email}
              </option>
            ))}
          </select>
          {history.length > 0 ? (
            <div className="container">
              <h3>Candidate history</h3>
              <table className="table table-bordered table-striped">
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Interviewer</th>
                  <th>Remarks</th>
                </tr>
                {history.map((value, index) => (
                  <tr key={index}>
                    <td>{value.date}</td>
                    <td>{value.time}</td>
                    <td>{value.interviewerId.email}</td>
                    <td>{value.remarks}</td>
                  </tr>
                ))}
              </table>
            </div>
          ) : null}
          <label for="interviewer">Interviewer</label>
          <select
            onChange={event =>
              this.setState({ interviewerId: event.target.value })
            }
            className="form-control"
          >
            <option value="">Choose One</option>
            {this.props.interviewers.map(value => (
              <option value={value._id}>
                {value.category} {value.designation}
              </option>
            ))}
          </select>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            min={new Date().toISOString().substr(0, 10)}
            className="form-control"
            id="date"
            onChange={event => this.setState({ date: event.target.value })}
          />
          <label htmlFor="time">Time</label>
          <input
            type="time"
            className="form-control"
            id="time"
            onChange={event => this.setState({ time: event.target.value })}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.markSelection()}
          >
            Accept
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.markRejection()}
          >
            Reject
          </button>
          <br />
          <button
            className="btn btn-default"
            onClick={() => this.scheduleInterview()}
          >
            Schedule
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  jobs: state.jobDetail.jobDetails,
  interviewers: state.categories.interviewers
})

export default connect(mapStateToProps)(Schedule)
