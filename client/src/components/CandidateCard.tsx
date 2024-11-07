import { useEffect, useState } from "react"
import { Candidate, CandidateSearch } from "../interfaces/Candidate.interface"
import { getUserDetails } from "../api/API.tsx"

interface CandidateCardProps {
  candidate: CandidateSearch
  onAccept: (candidateInfo: Candidate) => void //FIXME: Updated prop for the function to take valuie so we could pass in the details from the child to update the state value and local storage in teh parent to avoid having to move all of that doen here
  onReject: () => void
}

const CandidateCard = ({
  candidate,
  onAccept,
  onReject,
}: CandidateCardProps) => {
  // FIXME: Candidate Info state value to store results of API call
  const [candidateInfo, setCandidateInfo] = useState<Candidate>({} as Candidate) // type assertion to assert that the default value of the state variable is of the type of the state value IE {} as Candidate
  // FIXME: Using the username of candidate passed in for the card currently rendered on the screen we are hitting the API for that specific user to get the details and store them in the state value that we used to update the saved users state value from the parent VIA the prop passed into the onAccept function
  useEffect(() => {
    const fetchCandidateDetails = async () => {
      // FIXME: API call to get the user details based on the username of the card currently rendered on the screem
      const data = await getUserDetails(candidate.login)
      if (data) setCandidateInfo(data)
    }

    fetchCandidateDetails()
  }, [candidate])

  return (
    <main>
      <div className="candidate-card">
        <img
          //FIXME: these were changed to use the candidateInfo state value from this component that we fetched and set using the useEffect above ^^
          src={candidateInfo.avatar_url}
          alt={`${candidateInfo.login}'s avatar`}
          className="candidate-avatar"
        />
        <div className="candidate-info">
          <h2 className="candidate-name">
            {/*FIXME: Now candidateInfo instead of canidate before */}
            {candidateInfo.login}{" "}
            <span className="candidate-username">({candidateInfo.login})</span>
          </h2>
          {/*FIXME: Now candidateInfo instead of canidate before */}
          <p>Location: {candidateInfo.location}</p>
          <p>
            Email:{" "}
            <a
              /*FIXME: Now candidateInfo instead of canidate before */
              href={`mailto:${candidateInfo.email}`}
              className="candidate-email"
            >
              {candidateInfo.email}
            </a>
          </p>
          {/*FIXME: Now candidateInfo instead of canidate before */}
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
              // FIXME: we are now passing the local state variable for this candidate card currently rendered with the details into the onAccept function to add it local storage and also to update the state value savedCandidates aboce in tbe Candidate Search
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
