import { PROFILE } from '../actions/profile'

const initialState = {
  education: {
    college: '',
    degree: '',
    completionDate: ''
  },
  verified: {
    mobile: false,
    email: false
  },
  residence: {
    address: '',
    landmark: '',
    pincode: null
  },
  experience: 0,
  name: '',
  phoneNumber: null,
  email: '',
  cgpa: '',
  previousEmployee: '',
  applied: [],
  isFetching: true,
  resume: null,
  video: null
}

function setUserProfile(state, action) {
  return {
    ...state,
    ...action.userInfo,
    isFetching: false
  }
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE:
      return setUserProfile(state, action)
    default:
      return state
  }
}

export default profileReducer
