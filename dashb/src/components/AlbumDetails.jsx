import SongRow from './SongRow'
function AlbumDetails({title, artists, cover, songs, onClose, addToLikedSongs, likedSongs, removeFromLikedSongs, genre, year, tagline}) {
    return (
        <section className="album-details">
            <div className="album-details-with-photo">
                <img src={cover} alt="image" className="img"/>
                <div className="album-info">
                <h3>{title}</h3>
                <p>{artists}</p>
                <span className="genre-year">{genre} • {year}</span>   
                <p className="tagline">{tagline}</p>
                </div>
            </div>
            <div className="subtitles">
                <span></span>
                <p>Song</p>
                <p>Artists</p>
                <p>Album</p>
                <p>Time</p>
                <span></span>
            </div>
            <div className="song-list">
                {songs.map((song, index) => (
                    <SongRow
                    key={song.id}
                    index={index}
                    title={song.title}
                    albumTitle={title}
                    albumArtists={artists}
                    duration={song.duration}
                    addToLikedSongs={addToLikedSongs}
                    song={song}
                    likedSongs={likedSongs}
                    removeFromLikedSongs={removeFromLikedSongs}
                    />
                ))}
            </div>
            <button className="close-button"onClick={onClose}>Back</button>
        </section>
    )
}
export default AlbumDetails;