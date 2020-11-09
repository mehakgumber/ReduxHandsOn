import { serverName, baseUrl, fetchConfig } from '../config/server'

const GET_PENDING_INTERVIEWS = 'GET_PENDING_INTERVIEWS'

const getPendingInterviews = candidatesList => ({
  type: GET_PENDING_INTERVIEWS,
  candidatesList
})

const getAllPendingInterviews = interviewerId => {
  return dispatch => {
    return fetch(
      `${serverName}${baseUrl}/interviewer/getAllSchedulesForInterviewer`,
      {
        ...fetchConfig,
        body: JSON.stringify({ interviewerId: interviewerId })
      }
    )
      .then(res => res.json())
      .then(resJson => dispatch(getPendingInterviews(resJson)))
      .catch(err => console.log(err))
  }
}

export { GET_PENDING_INTERVIEWS, getAllPendingInterviews }
