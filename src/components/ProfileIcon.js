import PersonIcon from "@mui/icons-material/Person"
import { useSelector } from "react-redux"
function ProfileIcon() {
  const userInfo = useSelector((state) => state.userInfo)
  const { userImage } = userInfo
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          padding: "1.5rem",
        }}
      >
        <button className="circle">
          {userImage ? (
            <img src={userImage} className="circle" alt="userImage" />
          ) : (
            <PersonIcon
              fontSize="medium"
              sx={{
                color: "black",
              }}
            />
          )}
        </button>
      </div>
    </>
  )
}

export default ProfileIcon
