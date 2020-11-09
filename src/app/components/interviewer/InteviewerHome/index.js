import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../../../actions/authaction'
import { bindActionCreators } from 'redux'

const InterviewerHome = props => {
  return (
    <div>
      <ul className="nav nav-tabs">
        <li style={{ float: 'left' }}>
          <Link to="/">Back To Dashboard</Link>
        </li>
        <li style={{ float: 'right' }}>
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
)(InterviewerHome)
