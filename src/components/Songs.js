import { useLocation } from "react-router-dom"
import ProfileIcon from "./ProfileIcon"
import MusicContainer from "./MusicContainer"
function Songs() {
  const location = useLocation()
  const { userInput } = location.state
  console.log(userInput)
  return (
    <>
      <div className="background">
        <ProfileIcon />
        <MusicContainer userInput={userInput} />
      </div>
    </>
  )
}

export default Songs
