import { Link } from "react-router";

function NotFound() {
  return (
    <section className="error-not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">Back to Home</Link>
    </section>
  );
}
export default NotFound;