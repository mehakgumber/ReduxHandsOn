import { serverName, baseUrl } from '../config/server'

const ALLJOBS = 'ALLJOBS'

const allJobs = jobList => ({
  type: ALLJOBS,
  jobList
})

const getAllJobs = () => {
  return dispatch => {
    return fetch(`${serverName}${baseUrl}/job/allJobs`)
      .then(res => res.json())
      .then(resJson => dispatch(allJobs(resJson)))
      .catch(err => console.log(err))
  }
}

export { getAllJobs, ALLJOBS }
