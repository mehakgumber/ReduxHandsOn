import React, { Component } from 'react'
import { connect } from 'react-redux'

import InterviewerHome from './InteviewerHome'
import { serverName, baseUrl, fetchConfig } from '../../config/server'
import { getAllPendingInterviews } from '../../actions/interviewerActions'
import { bindActionCreators } from 'redux'

class Interviewer extends Component {
  constructor() {
    super()
    this.state = {
      remarks: ''
    }
  }

  submitResponse(e, schedule) {
    e.preventDefault()
    schedule.remarks = this.state.remarks
    fetch(`${serverName}${baseUrl}/schedule/submitResponse`, {
      ...fetchConfig,
      body: JSON.stringify({ ...schedule })
    })
      .then(() => this.props.getAllPendingInterviews(this.props._id))
      .then(() => alert('response sent'))
      .catch(err => console.log(err))
  }

  rejectInterview(e, schedule) {
    fetch(`${serverName}${baseUrl}/schedule/reject/${schedule._id}`)
      .then(() => alert('Interview Rejected'))
      .catch(err => console.log(err))

    const reSchedule = {
      candidateId: schedule.candidateId,
      jobId: schedule.jobId,
      status: 'ToBeScheduled'
    }
    fetch(`${serverName}${baseUrl}/job/close`, {
      ...fetchConfig,
      body: JSON.stringify({ ...reSchedule })
    })
      .then(() => this.props.getAllPendingInterviews(this.props._id))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <InterviewerHome />
        <div className="container text-center table-bordered">
          <h1>
            <u>Pending Interviews</u>
          </h1>
          {this.props.candidateList.map((candidate, index) => (
            <div key={index} className="card-container">
              <div className="card">
                <div className="card-body">
                  <h4>
                    <b>Candidate Email - </b> {candidate.candidateId.email}{' '}
                  </h4>
                  <hr />
                  <h4>
                    <b>Job Info - </b> {candidate.jobId.category},
                    {candidate.jobId.designation}
                  </h4>
                  <hr />
                  <h4>
                    <b>Date - </b> {candidate.date} &nbsp;&nbsp;<b>Time - </b>
                    {candidate.time}
                  </h4>
                  <hr />
                  <div className="row">
                    <div className="col-sm-4 col-xs-4">
                      <button
                        type="button"
                        className="btn"
                        onClick={() =>
                          this.props.history.push(
                            `/candidate/${candidate.candidateId._id}`
                          )
                        }
                        // (click)="checkProfile(item.candidateId._id)"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="View candidate profile"
                      >
                        Candidate Profile
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <label htmlFor="comment">
                        Enter Interview result Here <br />
                        <textarea
                          id="comment"
                          style={{ width: '200%' }}
                          onChange={e =>
                            this.setState({ remarks: e.target.value })
                          }
                          // (change)="onChangeComment($event)"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={event => this.submitResponse(event, candidate)}
                        // (click)="submitResponse($event, item)"
                      >
                        Submit Response
                      </button>
                    </div>

                    <div className="col-sm-8">
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="In case you do not want to take the interview"
                        onClick={event =>
                          this.rejectInterview(event, candidate)
                        }
                        // (click)="rejectInterview($event, item)"
                      >
                        Reject Interview
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  candidateList: state.pendingInterviews.candidatesList,
  _id: state.LoginData._id
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getAllPendingInterviews }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Interviewer)
