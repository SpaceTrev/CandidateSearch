import axios from "axios"
import { Candidate, CandidateSearch } from "../interfaces/Candidate.interface"

const GITHUB_API_BASE_URL = "https://api.github.com"

// FIXME: updated type that the promise is returning because the other values weren't available on this API call
export const searchGithub = async (): Promise<CandidateSearch[]> => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/users?since=${start}`,
      {
        // FIXME: Adding the headers with your github token here allows the rewquests to be authenticated slightly upping the API request limit
        headers: {
          Authorization: `Bearer TODO: Add your github token`,
          Accept: "application/vnd.github+json", // Required for GitHub API v3
        },
      }
    )
    const users = response.data
    return users.map((user: { id: string; login: string }) => ({
      id: user.id,
      username: user.login,
    }))
  } catch (error) {
    console.error("Error fetching GitHub users:", error)
    return []
  }
}
// FIXME: API Call that gets the user details in the CandidateCard Component
export const getUserDetails = async (
  username: string
): Promise<Candidate | null> => {
  try {
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/users/${username}`,
      {
        // FIXME: Adding the headers with your github token here allows the rewquests to be authenticated slightly upping the API request limit
        headers: {
          Authorization: `Bearer TODO: Add your github token`,
          Accept: "application/vnd.github+json", // Required for GitHub API v3
        },
      }
    )
    const user = response.data
    return {
      id: user.id,
      username: user.login,
      location: user.location || "N/A",
      avatar: user.avatar_url,
      email: user.email || "N/A",
      link: user.html_url,
      company: user.company || "N/A",
      bio: user.bio || "N/A",
    }
  } catch (error) {
    console.error("Error fetching GitHub user:", error)
    return null
  }
}
