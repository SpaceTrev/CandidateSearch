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

export interface CandidateSearch {
  id: number
  login: string
}
