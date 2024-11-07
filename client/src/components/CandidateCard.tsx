import { useEffect, useState } from "react"
import { Candidate, CandidateSearch } from "../interfaces/Candidate.interface"
import { getUserDetails } from "../api/API.tsx"

interface CandidateCardProps {
  candidate: CandidateSearch
  onAccept: (candidateInfo: Candidate) => void
  onReject: () => void
  currentIndex: number
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
}

const CandidateCard = ({
  candidate,
  onAccept,
  onReject,
  currentIndex,
  setCurrentIndex,
}: CandidateCardProps) => {
  const [candidateInfo, setCandidateInfo] = useState<Candidate>({} as Candidate)
  useEffect(() => {
    const fetchCandidateDetails = async () => {
      const data = await getUserDetails(candidate.login)
      if (data) setCandidateInfo(data)
      else setCurrentIndex(currentIndex + 1)
    }

    fetchCandidateDetails()
  }, [candidate])

  return (
    <main>
      <div className="candidate-card">
        <img
          src={candidateInfo.avatar_url}
          alt={`${candidateInfo.login}'s avatar`}
          className="candidate-avatar"
        />
        <div className="candidate-info">
          <h2 className="candidate-name">
            {candidateInfo.login}{" "}
            <span className="candidate-username">({candidateInfo.login})</span>
          </h2>
          <p>Location: {candidateInfo.location}</p>
          <p>
            Email:{" "}
            <a
              href={`mailto:${candidateInfo.email}`}
              className="candidate-email"
            >
              {candidateInfo.email}
            </a>
          </p>
          <p>Company: {candidateInfo.company}</p>
          <p className="candidate-bio">{candidateInfo.bio}</p>
        </div>
        <div className="button-group">
          <button className="reject-btn" onClick={onReject}>
            -
          </button>
          <button
            className="accept-btn"
            onClick={() => {
              onAccept(candidateInfo)
            }}
          >
            +
          </button>
        </div>
      </div>
    </main>
  )
}

export default CandidateCard
