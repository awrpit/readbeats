// we are fetching the title, artist, album, image and the preview url from the API
function MusicCard({
  name,
  artist,
  coverImage,
  previewUrl,
  clickHandler,
  song,
  selected,
  link,
}) {
  return (
    <>
      <div
        className="music-card"
        onClick={() => clickHandler(song)}
        style={{
          backgroundColor: selected === name ? "#DAC3FF" : "#FFFFFF",
        }}
      >
        <a href={link} target="_blank" rel="noreferrer">
          <img src={coverImage} alt="cover" className="cover-img" />{" "}
        </a>
        <div>
          <h1> {name} </h1>
          <p> {artist}</p>
          <audio src={previewUrl}></audio>
        </div>
      </div>
    </>
  )
}

export default MusicCard
