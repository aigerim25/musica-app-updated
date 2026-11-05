import { useState, Suspense } from "react";
import { Outlet } from "react-router";
import NavBar from "./NavBar.jsx";

function RootLayout() {
  const [likedSongs, setLikedSongs] = useState([]);

  function addToLikedSongs(song) {
    const isFavorite = likedSongs.some(item => item.id === song.id)
    if (isFavorite === false) {
        setLikedSongs(prev => [...prev, song])
    }
  }

  function removeFromLikedSongs(song) {
    const removeSong = likedSongs.filter(item => item.id !== song.id)
    setLikedSongs(removeSong)
  }

  return (
    <>
      <NavBar />
      <main>
        <Suspense fallback={<p>Loading page...</p>}>
          <Outlet context={{ likedSongs, addToLikedSongs, removeFromLikedSongs }} />
        </Suspense>
      </main>
    </>
  );
}

export default RootLayout;