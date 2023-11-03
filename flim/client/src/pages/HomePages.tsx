import { useState, useEffect } from "react";
import "../css/homePage.css";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import { AllFilm } from "../entities/film.entiti";
import { useNavigate } from "react-router-dom";
import { Categoty } from "../entities/category.entiti";

import instance from "../api/axios";

const HomePages: React.FC = () => {
  const [listMovies, setListMovies] = useState<AllFilm[]>([]);
  const [category, setCategory] = useState<Categoty[]>([]);

  const navigate = useNavigate();

  const loadcategory = () => {
    instance
      .get("category")
      .then((res) => {
        // console.log(res.data.category);
        setCategory(res.data.category);
      })
      .catch((err) => console.log("errqqq", err));
  };

  const loadMovies = () => {
    instance
      .get("movies")
      .then((res) => {
        setListMovies(res.data.movies);
        // console.log("res.data.movies:", res.data.movies)
      })
      .catch((err) => console.log("err:", err));
  };

  const handleReview = async (id: number) => {
    await instance
      .put(`/movies/review/count/${id}`)
      .then(() => {
        setTimeout(() => {
          navigate(`/review/${id}`);
        }, 1000);
      })
      .catch((err) => console.log("err:", err));
  };

  
  useEffect(() => {
    loadcategory();
    loadMovies();
  }, []);

  return (
    <div className="homePage">
      {/* navbar */}
      <div>
        <Navbar category={category} />
      </div>
      {/* carousel */}
      <div className="mt-20">
        <Carousel />

        {/* render video */}
        <div>
          <div className="render_film px-11 py-4">
            <h1 className="font-bold text-3xl py-4 text-white">Đề xuất</h1>
            <div className="flex flex-wrap gap-4">
              {listMovies.map((movies, i) => (
                <div
                  onClick={() => handleReview(movies.movieId)}
                  key={i}
                  className="film w-60 h-96  shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform transform-gpu hover:scale-105 text-white hover:bg-black hover:text-green-500"
                >
                  {/* <ReactPlayer
                    controls
                    width={240}
                    height={320}
                    url={movies.reviewUrl}
                  /> */}
                  <img className="w-full h-80" src={movies.image} alt="" />
                  <div className="hover:text-green-500 my-2">
                    <b>{movies.movie}</b>
                  </div>
                  <div className="flex justify-end text-xs cursor-pointer animate-pulse">
                    <span
                      className="text-white"
                      onClick={() => handleReview(movies.movieId)}
                    >
                      Xem thêm
                    </span>
                    <span className="text-green-600"> {">"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePages;
