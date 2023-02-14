import EastIcon from "@mui/icons-material/East"
import LinkIcon from "@mui/icons-material/Link"
import { useSelector } from "react-redux"
import MusicCard from "./MusicCard"
import Player from "./Player"
import { Alert } from "@mui/material"
import { useState } from "react"
import axios from "axios"

function MusicContainer({ userInput }) {
  const songs = useSelector((state) => state.songs)
  const token = useSelector((state) => state.token)
  const userInfo = useSelector((state) => state.userInfo)
  const [playlistUrl, setPlaylistUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeSong, setActiveSong] = useState(songs[0])
  const [selected, setSelected] = useState(null)

  function clickHandler(song, index) {
    setSelected(selected === song.name ? null : song.name)
    setActiveSong(song)
  }
  async function createPlaylist() {
    setIsLoading(true)
    const userId = userInfo.userId
    const trackUris = songs.map((song) => song.trackUri)
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
      const data = JSON.stringify({
        name: `Songs For ${userInput} ✨`,
        public: true,
      })
      const response = await axios.post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        data,
        { headers }
      )
      const playlistId = response.data.id
      await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          uris: trackUris,
        },
        { headers }
      )
      setPlaylistUrl(response.data.external_urls.spotify)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error)
    }
  }

  return (
    <>
      <div className="music-container">
        <div className="music-header">
          <div>
            <h1> Music For</h1>
            <h4> {userInput.toUpperCase()}</h4>
          </div>
          {playlistUrl ? (
            <a
              href={playlistUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
              }}
            >
              <button className="playlist-btn">
                <LinkIcon
                  sx={{
                    fontSize: "1.5rem",
                    transform: "rotate(-45deg)",
                    paddingLeft: "0.5rem",
                  }}
                />
                Checkout the playlist
              </button>
            </a>
          ) : isLoading ? (
            <button className="playlist-btn">
              <span className="loader"></span>Loading
            </button>
          ) : (
            <button className="playlist-btn" onClick={createPlaylist}>
              Create Playlist
              <EastIcon
                sx={{
                  fontSize: "small",
                  marginLeft: "0.5rem",
                }}
              />
            </button>
          )}
        </div>
        {error && <Alert severity="error">{error}</Alert>}
        <div className="music-body">
          <Player
            name={activeSong.name}
            artist={activeSong.artist}
            coverImage={activeSong.cover_image}
            previewUrl={activeSong.preview_url}
          />
          <div className="music-cards">
            {songs.length !== 0 ? (
              songs.map((song, index) => {
                return (
                  <MusicCard
                    selected={selected}
                    song={song}
                    name={song.name}
                    artist={song.artist}
                    coverImage={song.cover_image}
                    previewUrl={song.preview_url}
                    link={song.link}
                    key={index}
                    clickHandler={clickHandler}
                  />
                )
              })
            ) : (
              <h1> No songs </h1>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default MusicContainer
