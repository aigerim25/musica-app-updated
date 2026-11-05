import { useState } from 'react'
function SongRow ({id, index, title, duration, heart, dots, onClick, addToLikedSongs, song, removeFromLikedSongs, likedSongs, albumTitle, albumArtists}) {
    const isFavorite = likedSongs.some(item => item.id === song.id) 
    const [isMenu, isSetMenu] = useState(false)
    return (
        <section className="song-lists">
            <div className="song-rows">
                <span className="index">{index + 1}</span>
                <p className="song-title">{title}</p>
                <span>{song.artist}</span>
                <span>{song.album}</span>
                <span>{song.duration}</span>
                <div className="heart-dots">
                    <button className="favorite-button"onClick={() => 
                        {
                            if(isFavorite) {
                            removeFromLikedSongs(song)
                        }else {
                            addToLikedSongs(song)
                        }}
                    }>
                        {isFavorite ? "♥" : "♡"}
                    </button>
                    <button className="dots-button" onClick={() => isSetMenu(!isMenu)}>
                        {isMenu ? "•••" : "•••"}
                    </button>
                    {isMenu && (
                        <div className="song-details">
                            <button className="add-playlist">+ Add to playlist</button>
                            <button className="fav-playlist"onClick={() => addToLikedSongs(song)}>♥ Add to favorites</button>
                        </div> // мы вызвали функцию addToLiKED songs
                    )}
                </div>
            </div>
        </section>
    )
}
export default SongRow;