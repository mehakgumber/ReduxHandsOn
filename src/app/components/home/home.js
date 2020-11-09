import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../../actions/authaction'
import * as roles from '../../config/roles'

const Home = props => {
  return (
    <div>
      {props.isLoggedIn && props.expectedRole === roles.CANDIDATE ? (
        <div className="container text-center">
          <ul className="nav nav-tabs">
            <li className="col-sm-3">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="col-sm-3">
              <Link to="/jobs">Applied jobs</Link>
            </li>
            <li className="col-sm-3">
              <Link to="/allJobs">All Jobs</Link>
            </li>
            <li className="col-sm-3">
              <Link to="/" onClick={() => props.logout()}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.LoginData.isLogin,
  expectedRole: state.LoginData.role
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ logout }, dispatch)
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
)
