import { Link, useNavigate, useOutletContext, useParams } from "react-router";
import { usePlaylist } from "../hooks/useAlbum.js";
import AlbumDetails from "../components/AlbumDetails.jsx";

function AlbumPages() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { likedSongs, addToLikedSongs, removeFromLikedSongs } =
    useOutletContext();
  const { album, loading, error } = usePlaylist(id);

  if (loading) return <p>Loading...</p>;

  if (error === "Item not found") {
    return (
      <div>
        <p>Album not found</p>
        <Link to="/albums">All Items</Link>
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;
  if (!album) return null;

  return (
    <AlbumDetails
      title={album.title}
      artists={album.artists}
      genre={album.genre}
      year={album.year}
      tagline={album.tagline}
      cover={album.cover}
      onClose={() => navigate("/albums")}
      songs={album.songs}
      addToLikedSongs={addToLikedSongs}
      likedSongs={likedSongs}
      removeFromLikedSongs={removeFromLikedSongs}
    />
  );
}

export default AlbumPages;