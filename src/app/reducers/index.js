import { combineReducers } from 'redux'

import loginReducer from './loginReducer'
import jobReducer from './jobsReducer'
import allJobsReducer from './allJobsReducer'
import profileReducer from './profileReducer'
import scheduledJobsReducer from './scheduledJobsReducer'
import categoryReducer from './genreReducer'
import { LOGOUT } from '../actions/authaction'
import interviewsReducer from './pendingInterviews'

const appReducer = combineReducers({
  LoginData: loginReducer,
  jobInfo: jobReducer,
  jobDetail: allJobsReducer,
  userProfile: profileReducer,
  scheduledJobs: scheduledJobsReducer,
  categories: categoryReducer,
  pendingInterviews: interviewsReducer
})

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) return (state = undefined)
  return appReducer(state, action)
}

export default rootReducer
