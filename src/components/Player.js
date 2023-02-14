import { useRef, useState, useEffect } from "react"
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled"
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled"

function Player({ name, artist, coverImage, previewUrl }) {
  const audioRef = useRef()
  const [prevName, setPrevName] = useState(name)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    setPrevName(name)
  }, [name])

  useEffect(() => {
    if (prevName !== name) {
      setIsPlaying(false)
    }

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, prevName, name])

  function clickHandler() {
    if (isPlaying) {
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
    }
  }

  return (
    <>
      <div className="player">
        <audio src={previewUrl} ref={audioRef}>
          {" "}
        </audio>
        <img src={coverImage} className="player-img" alt="" />
        <div className="player-details">
          <div>
            <h1> {name}</h1>
            <p> {artist} </p>
          </div>
          <div className="play-button" onClick={clickHandler}>
            {" "}
            {isPlaying ? (
              <PauseCircleFilledIcon
                sx={{
                  fontSize: "3rem",
                  color: "#9E47F5",
                }}
              />
            ) : (
              <PlayCircleFilledIcon
                sx={{
                  fontSize: "3rem",
                  color: "#9E47F5",
                }}
              />
            )}{" "}
          </div>
        </div>
      </div>
    </>
  )
}

export default Player
