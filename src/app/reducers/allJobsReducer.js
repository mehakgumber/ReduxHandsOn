import { ALLJOBS } from '../actions/allJobs'

const initialState = {
  jobDetails: [
    {
      jobId: null,
      paySalary: null,
      lastDate: null,
      location: '',
      category: '',
      designation: '',
      skillsRequired: [
        {
          _id: null,
          skillName: ''
        }
      ]
    }
  ],
  isFetching: true
}

function handleAllJobs(state, action) {
  console.log(action.jobList)
  return {
    ...state,
    jobDetails: action.jobList,
    isFetching: false
  }
}

const allJobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALLJOBS:
      return handleAllJobs(state, action)
    default:
      return state
  }
}

export default allJobsReducer
