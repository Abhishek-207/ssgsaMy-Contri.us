import firebase from '../firebase'

// key will be reviewer Id
type ReviewMarks = {
  [key: string]: {
    A: number
    B: number
    C: number
    D: number
    E: number
    remark: string
  }
}

type InterviewMarks = {
  [key: string]: {
    A: number
    B: number
    C: number
    D: number
    remark: string
  }
}

// Values of application status are:
//   0 or undefined for 'unremoved' or not checked
//   1 for 'removed'
//   2 for 'finalised for review'
//   3 for 'reviewed'
//   4 for 'finalised for interview'
//   5 for 'interviewed'

export class AdminPortalData {
  application_status: number
  review_marks: ReviewMarks
  review_set: string
  interview_marks: InterviewMarks
  interview_set: string

  updateDetails(
    application_status: number,
    review_marks: ReviewMarks,
    review_set: string,
    interview_marks: InterviewMarks,
    interview_set: string,
  ) {
    this.application_status = application_status
    this.review_marks = review_marks
    this.review_set = review_set
    this.interview_marks = interview_marks
    this.interview_set = interview_set
  }
}

export const adminPortalDataConverter = {
  toFirestore: (admin_portal_data: AdminPortalData) => {
    return {}
  },

  fromFirestore: (
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ) => {
    let data = snapshot.data(options)
    let adminPortalData = new AdminPortalData()

    adminPortalData.updateDetails(
      data.application_status,
      data.review_marks,
      data.review_set,
      data.interview_marks,
      data.interview_set,
    )
    return adminPortalData
  },
}
