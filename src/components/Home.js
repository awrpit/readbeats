import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { setUserInfo } from "../redux/action"
import ProfileIcon from "./ProfileIcon"
import EastIcon from "@mui/icons-material/East"
import { setMusicData, setSongs } from "../redux/action"
import { useNavigate } from "react-router-dom"
import { Alert } from "@mui/material"

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.token)
  const userInfo = useSelector((state) => state.userInfo)
  const songs = useSelector((state) => state.songs)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { userName } = userInfo

  const [userInput, setUserInput] = useState("")
  useEffect(() => {
    async function getUserProfile() {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })

      const userInfo = {
        userId: data.id,
        userName: data.display_name,
        userImage: data.images[0].url,
      }
      dispatch(setUserInfo(userInfo))
    }
    getUserProfile()
  }, [dispatch, token])

  async function clickHandler() {
    setError("")
    try {
      setIsLoading(true)
      const response = await axios.post(
        "https://readbeatsapi.up.railway.app/api/bookinfo",
        {
          bookName: userInput,
        }
      )

      const musicData = response?.data?.output?.text
      dispatch(setMusicData(musicData))
      try {
        const songs = await axios.post(
          "https://readbeatsapi.up.railway.app/api/getsongs",
          {
            musicData: musicData,
            token: token,
          }
        )
        console.log(songs.data.output[0])
        dispatch(setSongs(songs.data.output))
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setError(error)
      }
    } catch (error) {
      setIsLoading(false)
      setError(error)
    }
  }

  return (
    <>
      <div className="background">
        <ProfileIcon />
        <div className="inner-container">
          <h2> Welcome back {userName}</h2>
          <div>
            <h1> Enjoy the music while reading a book!</h1>
            <h2>
              {" "}
              Creates spotify playlist which matches the vibe of the book
            </h2>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Enter the bookname here"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value)
                dispatch(setSongs([]))
              }}
              className="text-input"
            />
            {isLoading ? (
              <button className="search-btn" onClick={clickHandler}>
                <div className="loader"></div>
              </button>
            ) : (
              <button className="search-btn" onClick={clickHandler}>
                go
                <EastIcon
                  sx={{
                    fontSize: "small",
                    marginLeft: "0.5rem",
                  }}
                />{" "}
              </button>
            )}
          </div>
          {error && <Alert severity="error"></Alert>}
          {songs.length > 0 && (
            <>
              <h1>
                We found {songs.length} songs for you {userName}, for{" "}
                {userInput}. 🥂{" "}
              </h1>
              <button
                onClick={() =>
                  navigate("/songs", {
                    state: {
                      userInput: userInput,
                    },
                  })
                }
                className="check-btn"
              >
                {" "}
                Check them out{" "}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
