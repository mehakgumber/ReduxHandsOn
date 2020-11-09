import { serverName, baseUrl } from '../config/server'

const PROFILE = 'PROFILE'

const profile = userInfo => ({
  type: PROFILE,
  userInfo
})

const getProfile = candidateId => {
  return dispatch => {
    return fetch(`${serverName}${baseUrl}/candidate/${candidateId}`)
      .then(res => res.json())
      .then(resJson => dispatch(profile(resJson)))
      .catch(err => console.log(err))
  }
}

export { getProfile, PROFILE }
