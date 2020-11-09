import { serverName, baseUrl } from '../config/server'
import { getCandidateAppliedJobs } from './appliedJobs'
import { getProfile } from './profile'

const applyJobAction = (candidateId, jobId) => {
  return dispatch => {
    fetch(`${serverName}${baseUrl}/job/applyJob`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({ candidateId: candidateId, jobId: jobId })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(getCandidateAppliedJobs(candidateId))
          dispatch(getProfile(candidateId))
        }
        console.log('applied job message', data)
        alert(data.message)
      })
      .catch(err => console.log(err))
  }
}

export { applyJobAction }
