import { Link } from "react-router";

function Home() {
  return (
    <section className="my-music-page">
      <h1>My Music</h1>
      <p>Music-app.</p>
      {/* <img src="/covers/..." alt="..." /> */}
      <Link to="/albums">Browse albums</Link>
      <Link to="/dashboard">Dashboard</Link>
    </section>
  );
}
export default Home;