// FIXME: this type is now being used on the second API call within the CandidateCard where we get the details for that specific user
export interface Candidate {
  id: number
  login: string
  location: string
  avatar_url: string
  email: string
  html_url: string
  company: string
  bio: string
}

// FIXME: New Type was added because these are the only relevant details we are using from the first API call and location, email, link, company and bio weewn't available from the first API call
export interface CandidateSearch {
  id: number
  login: string
}
