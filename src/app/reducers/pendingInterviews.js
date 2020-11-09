import { GET_PENDING_INTERVIEWS } from '../actions/interviewerActions'

const initialState = {
  candidatesList: []
}

function handleInterviews(state, action) {
  return {
    ...state,
    candidatesList: action.candidatesList
  }
}

const interviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PENDING_INTERVIEWS:
      return handleInterviews(state, action)
    default:
      return state
  }
}

export default interviewsReducer
