import { serverName, baseUrl } from '../config/server'

const GETJOBS = 'GETJOBS'
const SCHEDULEDJOBS = 'SCHEDULEDJOBS'

const appliedJobs = jobInfo => ({
  type: GETJOBS,
  jobInfo
})

const scheduledJobs = jobInfo => ({
  type: SCHEDULEDJOBS,
  jobInfo
})

const getCandidateAppliedJobs = candidateId => {
  console.log(candidateId)
  return dispatch => {
    return fetch(`${serverName}${baseUrl}/candidate/getAllAppliedJobs`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({ candidateId: candidateId })
    })
      .then(res => res.json())
      .then(resJson => dispatch(appliedJobs(resJson)))
      .catch(err => console.log(err))
  }
}

const getAllScheduledJobs = (candidateId, jobId) => {
  console.log('schedule action', candidateId, jobId)
  return dispatch => {
    return fetch(`${serverName}${baseUrl}/schedule/getAllScheduledJobs`, {
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
      .then(resJson => dispatch(scheduledJobs(resJson)))
      .catch(err => console.log(err))
  }
}

export { GETJOBS, SCHEDULEDJOBS, getAllScheduledJobs, getCandidateAppliedJobs }
