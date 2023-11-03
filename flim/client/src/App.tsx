import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import HomePages from "./pages/HomePages";
import FilmReview from "./pages/FilmReview";
import PlayPages from "./pages/PlayPages";
import { useEffect } from "react";
import Category from "./pages/Category";
import Search from "./pages/Search";
import Settings from "./pages/Settings";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/:id" element={<Category />} />
        <Route path="/review/:idParam" element={<FilmReview />} />
        <Route path="/play/:idVideo/reviewId/:idChap" element={<PlayPages />} />
        <Route path="/search" element={<Search/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
