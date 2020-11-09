import { serverName, baseUrl } from '../config/server'

const GETALLCATEGORIES = 'GETALLCATEGORIES'
const LOCATIONS = 'LOCATIONS'
const INTERVIEWERS = 'INTERVIEWERS'

const getCategories = allCategories => ({
  type: GETALLCATEGORIES,
  allCategories
})

const getLocations = locations => ({
  type: LOCATIONS,
  locations
})

const getInterviewers = interviewers => ({
  type: INTERVIEWERS,
  interviewers
})

const getAllCategories = () => {
  return dispatch => {
    return fetch(`${serverName}${baseUrl}/genre/`)
      .then(res => res.json())
      .then(resJson => dispatch(getCategories(resJson)))
      .catch(err => console.log(err))
  }
}

const getAllLocations = () => {
  return dispatch => {
    return fetch(`${serverName}${baseUrl}/admin/getAllLocations`)
      .then(res => res.json())
      .then(resJson => dispatch(getLocations(resJson)))
      .catch(err => console.log(err))
  }
}

const getAllInterviewers = () => {
  return dispatch => {
    return fetch(`${serverName}${baseUrl}/admin/allInterviewers`)
      .then(res => res.json())
      .then(resJson => dispatch(getInterviewers(resJson)))
      .catch(err => console.log(err))
  }
}

export {
  getAllCategories,
  GETALLCATEGORIES,
  LOCATIONS,
  getAllLocations,
  INTERVIEWERS,
  getAllInterviewers
}
