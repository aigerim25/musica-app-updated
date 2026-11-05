    function AlbumCard ({id, title, artists, cover, status, songs, onOpen}) {
        console.log("render AlbumCard", title)
        return (
            <section className="album-card">
                <img onClick={onOpen} src={cover} alt="img" className="album-card-img" /> 
                <h3 onClick={onOpen}>{title}</h3>
                <p>{artists}</p>
            </section>
        )
    }
    export default AlbumCard;