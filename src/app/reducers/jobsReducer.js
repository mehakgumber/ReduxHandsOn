import { GETJOBS } from '../actions/appliedJobs'

const initialState = {
  appliedJobs: [
    {
      category: '',
      designation: '',
      date: 'N/A',
      time: 'N/A',
      status: '',
      jobId: ''
    }
  ],
  isFetching: true
}

function handleJobs(state, action) {
  console.log(action.jobInfo)
  return {
    ...state,
    appliedJobs: action.jobInfo,
    isFetching: false
  }
}

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETJOBS:
      return handleJobs(state, action)
    default:
      return state
  }
}

export default jobReducer
