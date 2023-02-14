import ProfileIcon from "./ProfileIcon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpotify } from "@fortawesome/free-brands-svg-icons"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setToken } from "../redux/action"
function LandingPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginHandler = () => {
    const clientId = "c752b152ff82448cacd501a8e8c1a29e"
    const redirectUri = "http://localhost:3000/"
    const apiUrl = "https://accounts.spotify.com/authorize"
    const scope = [
      "user-read-email",
      "user-read-private",
      "playlist-read-collaborative",
      "playlist-modify-public",
      "user-library-read",
      "user-library-modify",
    ]
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`
  }

  useEffect(() => {
    function getToken() {
      const hash = window.location.hash
      if (hash) {
        const token = hash.substring(1).split("&")[0].split("=")[1]
        dispatch(setToken(token))
        navigate("/home")
      }
    }
    getToken()
  }, [dispatch, navigate])

  return (
    <>
      <div className="background">
        <ProfileIcon />
        <div className="inner-container">
          <div>
            <h1> Enjoy the music while reading a book!</h1>
            <h2>
              {" "}
              Creates spotify playlist which matches the vibe of the book
            </h2>
          </div>

          <div>
            <button className="spotify-btn" onClick={loginHandler}>
              <FontAwesomeIcon icon={faSpotify} className="fa-xl" />
              Continue with Spotify{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage
