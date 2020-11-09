import decode from 'jwt-decode'

import { serverName, baseUrl, auth } from '../config/server'
import { getProfile } from './profile'
import { getCandidateAppliedJobs } from './appliedJobs'
import { getAllJobs } from './allJobs'
import {
  getAllCategories,
  getAllLocations,
  getAllInterviewers
} from './adminActions'
import * as roles from '../config/roles'
import { getAllPendingInterviews } from './interviewerActions'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

const login = token => ({
  type: LOGIN,
  token
})

const performLogout = () => ({
  type: LOGOUT
})

const doLogin = (email, password) => {
  return dispatch => {
    fetch(`${serverName}${baseUrl}${auth}/login`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({ email: email, password: password })
    })
      .then(res => res.json())
      .then(resJson => {
        if (resJson.token) {
          localStorage.setItem('token', resJson.token)
          switch (decode(resJson.token).role) {
            case roles.CANDIDATE:
              dispatch(eventDispatcher(resJson.token))
              break
            case roles.ADMIN:
              dispatch(adminEvents(resJson.token))
              break
            case roles.INTERVIEWER:
              console.log('dispatching')
              dispatch(interviewerEvents(resJson.token))
              break
            default:
              break
          }
        } else {
        }
      })
      .catch(err => console.log(err))
  }
}

const eventDispatcher = token => {
  return dispatch => {
    dispatch(login(token))
    dispatch(getProfile(decode(token)._id))
    dispatch(getCandidateAppliedJobs(decode(token)._id))
    dispatch(getAllJobs())
  }
}

const adminEvents = token => {
  return dispatch => {
    dispatch(login(token))
    dispatch(getAllCategories())
    dispatch(getAllLocations())
    dispatch(getAllJobs())
    dispatch(getAllInterviewers())
  }
}

const interviewerEvents = token => {
  return dispatch => {
    dispatch(login(token))
    dispatch(getAllPendingInterviews(decode(token)._id))
  }
}

const logout = dispatch => {
  localStorage.removeItem('token')
  dispatch(performLogout)
}

export {
  doLogin,
  login,
  logout,
  LOGIN,
  LOGOUT,
  eventDispatcher,
  adminEvents,
  interviewerEvents
}
