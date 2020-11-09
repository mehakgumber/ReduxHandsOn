import {
  GETALLCATEGORIES,
  LOCATIONS,
  INTERVIEWERS
} from '../actions/adminActions'

const initialState = {
  categoryList: [],
  locations: [],
  interviewers: []
}

function handleCategories(state, action) {
  return {
    ...state,
    categoryList: action.allCategories
  }
}

function handleLocations(state, action) {
  return {
    ...state,
    locations: action.locations
  }
}

function handleInterviewers(state, action) {
  return {
    ...state,
    interviewers: action.interviewers
  }
}

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLCATEGORIES:
      return handleCategories(state, action)
    case LOCATIONS:
      return handleLocations(state, action)
    case INTERVIEWERS:
      return handleInterviewers(state, action)
    default:
      return state
  }
}

export default categoryReducer
