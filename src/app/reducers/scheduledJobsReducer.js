import { SCHEDULEDJOBS } from '../actions/appliedJobs'

const initialState = {
  candidateId: null,
  jobId: null,
  date: '',
  time: ''
}

function handleScheduledJobs(state, action) {
  return {
    ...state,
    ...action.jobInfo
  }
}

const scheduledJobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SCHEDULEDJOBS:
      return handleScheduledJobs(state, action)
    default:
      return state
  }
}

export default scheduledJobsReducer
