import { lazy } from "react";
import { Routes, Route } from "react-router";
import RootLayout from "./components/RootLayout.jsx";
import Home from "./pages/Home.jsx";
import Albums from "./pages/Albums.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";

const AlbumPage = lazy(() => import("./pages/AlbumPages.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const About = lazy(() => import("./pages/About.jsx"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="albums" element={<Albums />} />
        <Route path="albums/:id" element={<AlbumPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;