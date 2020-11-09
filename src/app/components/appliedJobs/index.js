import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getAllScheduledJobs } from '../../actions/appliedJobs'

class AppliedJobs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appliedJobs: this.props.appliedJobs
    }
  }

  // async componentDidMount() {
  //   await this.state.appliedJobs.forEach(async element => {
  //     if (element.status === 'InterviewScheduled') {
  //       await this.props.getAllScheduledJobs(
  //         this.props.candidateId,
  //         element.jobId._id
  //       )
  //       await this.state.appliedJobs.forEach(element => {
  //         if (
  //           element.candidateId === this.props.scheduledJobs.candidateId &&
  //           element.jobId._id === this.props.scheduledJobs.jobId
  //         ) {
  //           element.date = this.props.scheduledJobs.date.substr(0, 10)
  //           element.time = this.props.scheduledJobs.time
  //         }
  //       })
  //     }
  //   })
  //   this.state.loading = false
  // }

  render() {
    return (
      <div className="container">
        {this.props.isFetching || this.state.loading ? (
          <div>Loading...</div>
        ) : (
          <table className="table table-bordered table-striped">
            <tbody>
              <tr>
                <th>Category</th>
                <th>Designation</th>
                <th>Status</th>
              </tr>
              {this.props.appliedJobs.map((data, index) => (
                <tr key={index}>
                  <td>{data.jobId.category}</td>
                  <td>{data.jobId.designation}</td>
                  <td>{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    appliedJobs: state.jobInfo.appliedJobs,
    isFetching: state.jobInfo.isFetching,
    candidateId: state.LoginData._id,
    scheduledJobs: state.scheduledJobs
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getAllScheduledJobs }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppliedJobs)
