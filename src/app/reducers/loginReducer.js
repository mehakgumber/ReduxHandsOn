import { LOGIN } from '../actions/authaction'
import decode from 'jwt-decode'

const initialState = {
  isLogin: false,
  _id: null,
  role: null,
  mobile: false
}

function handleLogin(state, action) {
  let decoded = decode(action.token)
  console.log('decoded', decoded)
  return {
    ...state,
    isLogin: decoded._id !== null,
    _id: decoded._id,
    mobile: decoded.mobile,
    role: decoded.role
  }
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return handleLogin(state, action)
    default:
      return state
  }
}

export default loginReducer
