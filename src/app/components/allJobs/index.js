import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { applyJobAction } from '../../actions/applyJob'

const AllJobs = props => {
  return (
    <div className="container">
      {props.isFetching ? (
        <div>Loading...</div>
      ) : (
        <table className="table table-bordered table-striped">
          <tbody>
            <tr>
              <th>Category</th>
              <th>Designation</th>
              <th>JobId</th>
              <th>Description</th>
              <th>Location</th>
              <th>SkillsRequired</th>
              <th>Apply</th>
            </tr>
            {props.allJobs.map((data, index) => (
              <tr key={index}>
                <td>{data.category}</td>
                <td>{data.designation}</td>
                <td>{data.jobId}</td>
                <td>{data.description}</td>
                <td>{data.location}</td>
                <td>
                  <ul>
                    {data.skillsRequired.map((info, index) => (
                      <li key={index}>{info.skillName}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() =>
                      props.applyJobAction(props.candidateId, data._id)
                    }
                  >
                    Apply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    allJobs: state.jobDetail.jobDetails,
    isFetching: state.jobDetail.isFetching,
    candidateId: state.LoginData._id
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ applyJobAction }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllJobs)
