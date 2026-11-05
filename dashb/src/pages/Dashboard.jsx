import { useState } from "react";
import { Link, useOutletContext } from "react-router";
import { usePlaylists } from "../hooks/useAlbum.js";

const ALL_QUERY = "limit=100&sort=name"; 
function formatTotal(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h} h ${m} min` : `${m} min`;
}
function toSeconds(duration) {
  if (typeof duration === "number") return duration;
  if (typeof duration === "string" && duration.includes(":")) {
    const [m, s] = duration.split(":").map(Number);
    return m * 60 + s;
  }
  return 0;
}

function countBy(items, getKey) {
  const result = {};
  items.forEach((item) => {
    const key = getKey(item);
    result[key] = (result[key] || 0) + 1;
  });
  return Object.entries(result);
}

function Dashboard() {
  const { likedSongs } = useOutletContext();
  const { albums, loading, error } = usePlaylists(ALL_QUERY);
  const [genre, setGenre] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (albums.length === 0) return <p>No data yet</p>;

  const filtered = genre ? albums.filter((a) => a.genre === genre) : albums;

  const allSongs = filtered.flatMap((a) => a.songs);
  const totalSeconds = allSongs.reduce((sum, s) => sum + toSeconds(s.duration), 0);
  const likedIds = new Set(likedSongs.map((s) => s.id));
  const likedCount = allSongs.filter((s) => likedIds.has(s.id)).length;

  const stats = [
    { label: "Playlists", value: filtered.length },
    { label: "Songs", value: allSongs.length },
    { label: "Total duration", value: formatTotal(totalSeconds) },
    { label: "Liked songs", value: likedCount },
    {
      label: "Avg songs per playlist",
      value: filtered.length ? (allSongs.length / filtered.length).toFixed(1) : 0,
    },
  ];

  const byGenre = countBy(albums, (a) => a.genre);

  const byDecade = countBy(filtered, (a) => `${Math.floor(a.year / 10) * 10}s`).sort(
    (a, b) => a[0].localeCompare(b[0]),
  );

  const maxGenre = Math.max(...byGenre.map(([, n]) => n));
  const maxDecade = Math.max(...byDecade.map(([, n]) => n), 1);

  return (
    <section className="dashboard">
      <h1>Dashboard</h1>

      <div className="dashboard-filter">
        <label htmlFor="genre-filter">Genre: </label>
        <select
          id="genre-filter"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">All genres</option>
          {byGenre.map(([name]) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="stat-cards">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="breakdowns">
        <div className="breakdown">
          <h2>By genre</h2>
          {byGenre.map(([name, count]) => (
            <button
              key={name}
              className={`bar-row ${genre === name ? "active" : ""}`}
              onClick={() => setGenre(genre === name ? "" : name)}
            >
              <span className="bar-label">{name}</span>
              <span className="bar-track">
                <span
                  className="bar-fill"
                  style={{ width: `${(count / maxGenre) * 100}%` }}
                />
              </span>
              <span className="bar-count">{count}</span>
            </button>
          ))}
        </div>

        <div className="breakdown">
          <h2>By decade</h2>
          {byDecade.map(([name, count]) => (
            <div key={name} className="bar-row">
              <span className="bar-label">{name}</span>
              <span className="bar-track">
                <span
                  className="bar-fill"
                  style={{ width: `${(count / maxDecade) * 100}%` }}
                />
              </span>
              <span className="bar-count">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-links">
        <h2>Playlists</h2>
        <ul>
          {filtered.map((a) => (
            <li key={a.id}>
              <Link to={`/albums/${a.id}`}>
                {a.title} ({a.year})
              </Link>
            </li>
          ))}
        </ul>
        <Link to={genre ? `/albums?genre=${encodeURIComponent(genre)}` : "/albums"}>
          Open in Albums
        </Link>
      </div>
    </section>
  );
}

export default Dashboard;