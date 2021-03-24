import axios from 'axios'

export default {
  getMeeting(meetingId) {
    return axios.get(`/zoom/meetings/${meetingId}`)
  },
  getSignature(meetingNumber, role) {
    return axios.post(`/zoom/web-sdk/signature`, {
      meetingNumber,
      role
    })
  }
}
