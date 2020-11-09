import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import decode from 'jwt-decode'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Login from '../components/login/login'
import Home from '../components/home/home'
import AppliedJobs from '../components/appliedJobs'
import AllJobs from '../components/allJobs'
import Profile from '../components/candidateProfile/profile'
import Admin from '../components/admin'

import {
  eventDispatcher,
  adminEvents,
  interviewerEvents
} from '../actions/authaction'

import PrivateRoute from './privateRoute'
import * as roles from '../config/roles'
import AddCategory from '../components/admin/addCategory'
import AddDesignation from '../components/admin/addDesignation'
import AddInterviewer from '../components/admin/addInterviewer'
import AddJob from '../components/admin/addJob'
import AddLocation from '../components/admin/addLocation'
import Schedule from '../components/admin/schedule'
import Interviewer from '../components/interviewer'
import ViewProfile from '../components/interviewer/viewProfile'

class AppRouter extends Component {
  componentWillMount() {
    console.log('App router mounted')
    let token = localStorage.getItem('token')
    if (token) {
      let decoded = decode(token)
      switch (decoded.role) {
        case roles.CANDIDATE:
          this.props.eventDispatcher(token)
          break
        case roles.ADMIN:
          this.props.adminEvents(token)
          break
        case roles.INTERVIEWER:
          this.props.interviewerEvents(token)
          break
        default:
          break
      }
    }
  }

  render() {
    return (
      <Router>
        <Home />
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute
            exact
            path="/jobs"
            role={roles.CANDIDATE}
            component={AppliedJobs}
            isLoggedIn={this.props.isLoggedIn}
            expectedRole={this.props.expectedRole}
          />
          <PrivateRoute
            exact
            path="/allJobs"
            role={roles.CANDIDATE}
            component={AllJobs}
            isLoggedIn={this.props.isLoggedIn}
            expectedRole={this.props.expectedRole}
          />
          <PrivateRoute
            exact
            path="/profile"
            role={roles.CANDIDATE}
            component={Profile}
            isLoggedIn={this.props.isLoggedIn}
            expectedRole={this.props.expectedRole}
          />
          <Route exact path="/candidate/:id" component={ViewProfile} />
          <PrivateRoute
            path="/admin"
            role={roles.ADMIN}
            component={Admin}
            isLoggedIn={this.props.isLoggedIn}
            expectedRole={this.props.expectedRole}
          />
          <PrivateRoute
            path="/addCategory"
            role={roles.ADMIN}
            component={AddCategory}
            isLoggedIn={this.props.isLoggedIn}
            expectedRole={this.props.expectedRole}
          />
          <PrivateRoute
            path="/addDesignation"
            role={roles.ADMIN}
            component={AddDesignation}
            isLoggedIn={this.props.isLoggedIn}
            expectedRole={this.props.expectedRole}
          />
          <PrivateRoute
            path="/addInterviewer"
            role={roles.ADMIN}
            component={AddInterviewer}
            isLoggedIn={this.props.isLoggedIn}
            expectedRole={this.props.expectedRole}
          />
          <PrivateRoute
            path="/addJob"
            role={roles.ADMIN}
            component={AddJob}
            isLoggedIn={this.props.isLoggedIn}
            expectedRole={this.props.expectedRole}
          />
          <PrivateRoute
            path="/addLocation"
            role={roles.ADMIN}
            component={AddLocation}
            isLoggedIn={this.props.isLoggedIn}
            expectedRole={this.props.expectedRole}
          />
          <PrivateRoute
            path="/schedule"
            role={roles.ADMIN}
            component={Schedule}
            isLoggedIn={this.props.isLoggedIn}
            expectedRole={this.props.expectedRole}
          />
          <PrivateRoute
            path="/interviewer"
            role={roles.INTERVIEWER}
            component={Interviewer}
            isLoggedIn={this.props.isLoggedIn}
            expectedRole={this.props.expectedRole}
          />
          <Route path="*" component={Login} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.LoginData.isLogin,
  expectedRole: state.LoginData.role
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { eventDispatcher, adminEvents, interviewerEvents },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter)
