import { useState, useEffect } from "react";
import "../css/homePage.css";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import { AllFilm } from "../entities/film.entiti";
import { useNavigate, useParams } from "react-router-dom";
import { Categoty } from "../entities/category.entiti";
import instance from "../api/axios";

const Category: React.FC = () => {
  const [listMovies, setListMovies] = useState<AllFilm[]>([]);
  const [category, setCategory] = useState<Categoty[]>([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const loadcategory = () => {
    instance
      .get("category")
      .then((res) => {
        // console.log(res.data.category);
        setCategory(res.data.category);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    instance
      .get(`category/${id}`)
      .then((res) => {
        // console.log(res.data.categoryOne);
        setListMovies(res.data.categoryOne);
      })
      .catch((err) => console.log("err:", err));
  }, [id]);

  const handleReview = (id: number) => {
    navigate(`/review/${id}`);
  };

  useEffect(() => {
    loadcategory();
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
              {listMovies.map((movie, i) => (
                <div
                  key={i}
                  className="film w-60 h-96  shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform transform-gpu hover:scale-105 text-white hover:bg-black hover:text-green-500"
                >
                  <video
                    src={movie.reviewUrl}
                    className="card-img-top w-full object-cover h-5/6"
                    autoPlay={false}
                  ></video>
                  <div className="hover:text-green-500 my-2">
                    <b>{movie.movie}</b>
                  </div>
                  <div className="flex justify-end text-xs cursor-pointer animate-pulse">
                    <span
                      className="text-white"
                      onClick={() => handleReview(movie.movieId)}
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

export default Category;
