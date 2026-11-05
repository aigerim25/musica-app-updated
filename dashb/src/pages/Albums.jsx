import { useNavigate, useSearchParams } from "react-router";
import { usePlaylists } from "../hooks/useAlbum.js";
import AlbumCard from "../components/AlbumCard.jsx";

const LIMIT = 6;
const GENRES = ["Alternative pop", "Dance Hits", "Retrowave", "Covers", "Soundtrack", "Pop", "Q-pop (Qazaq-pop)"];
const DECADES = [1980, 2000, 2010, 2020];

function Albums() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const genre = searchParams.get("genre") || "";
  const decade = searchParams.get("decade") || "";
  const sort = searchParams.get("sort") || "name";
  const page = Number(searchParams.get("page")) || 1;

  const query = new URLSearchParams({
    search,
    genre,
    decade,
    sort,
    page,
    limit: LIMIT,
  }).toString();

  const { albums, totalPages, loading, error } = usePlaylists(query);

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== "page") next.delete("page"); // любое изменение фильтров возвращает на 1 страницу
    setSearchParams(next, { replace: key === "search" });
  }

  function resetFilters() {
    setSearchParams({});
  }

  return (
    <div>
      <div className="filters">
        <input
          type="search"
          placeholder="Search by title or artist"
          value={search}
          onChange={(e) => updateParam("search", e.target.value)}
        />

        <select value={genre} onChange={(e) => updateParam("genre", e.target.value)}>
          <option value="">All genres</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <select value={decade} onChange={(e) => updateParam("decade", e.target.value)}>
          <option value="">All years</option>
          {DECADES.map((d) => (
            <option key={d} value={d}>{d}s</option>
          ))}
        </select>

        <select value={sort} onChange={(e) => updateParam("sort", e.target.value)}>
          <option value="name">Title A-Z</option>
          <option value="name-desc">Title Z-A</option>
          <option value="year-desc">Newest first</option>
          <option value="year">Oldest first</option>
          <option value="songs-desc">Most songs</option>
        </select>

        <button onClick={resetFilters}>Reset</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && albums.length === 0 && <p>No albums found</p>}

      {!loading && !error && albums.length > 0 && (
        <div className="album-cards">
          {albums.map((album) => (
            <AlbumCard
              key={album.id}
              title={album.title}
              artists={album.artists}
              cover={album.cover}
              onOpen={() => navigate(`/albums/${album.id}`)}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page <= 1} onClick={() => updateParam("page", String(page - 1))}>
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={p === page ? "active" : ""}
              onClick={() => updateParam("page", String(p))}
            >
              {p}
            </button>
          ))}
          <button disabled={page >= totalPages} onClick={() => updateParam("page", String(page + 1))}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Albums;