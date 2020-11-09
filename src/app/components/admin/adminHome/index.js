import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logout } from '../../../actions/authaction'
import { bindActionCreators } from 'redux'

const AdminHome = props => {
  return (
    <div className="text-center">
      <ul className="nav nav-tabs">
        <li className="col-sm-2">
          <Link to="/addCategory">Add Category</Link>
        </li>
        <li className="col-sm-2">
          <Link to="/addDesignation">Add Designation</Link>
        </li>
        <li className="col-sm-1">
          <Link to="/addJob">Add job</Link>
        </li>
        <li className="col-sm-2">
          <Link to="/addInterviewer">Add Interviewer</Link>
        </li>
        <li className="col-sm-2">
          <Link to="/addLocation">Add Location</Link>
        </li>
        <li className="col-sm-2">
          <Link to="/schedule">Schedule</Link>
        </li>
        <li className="col-sm-1">
          <Link to="/" onClick={() => props.logout()}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ logout }, dispatch)
}

export default connect(
  null,
  mapDispatchToProps
)(AdminHome)
