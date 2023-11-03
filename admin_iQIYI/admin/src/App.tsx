// import { useState } from "react";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePages from "./pages/HomePages";
import Category from "./pages/Category";
import Users from "./pages/Users";
import AdminPage from "./pages/AdminPage";
import { Categoryes } from "./components/Categoryes";
import Statistical from "./pages/Statistical";
// import UploadMovies from "./components/UploadMovies";
import UploadAlbum from "./components/UploadAlbum";
import ShowMovies from "./components/ShowMovies";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AdminPage />}>
          <Route index element={<HomePages />} />
          <Route path="/category">
            <Route index element={<Category />} />
            <Route path="/category/:id" element={<Categoryes />} />
            <Route
              path="/category/upload/:uploadAlbum"
              element={<UploadAlbum />}
            />
          </Route>
          <Route path="/users" element={<Users />} />
          <Route path="/statistical">
            <Route index element={<Statistical />} />
            <Route path="/statistical/:movieId" element={<ShowMovies />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
