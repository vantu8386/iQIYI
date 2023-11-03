import React, { useEffect, useState } from "react";
import "../css/thongke.css";
import { AllFilm } from "../entities/movies.entities";
import instance from "../api/axios";
import { Link } from "react-router-dom";

const Statistical: React.FC = () => {
  const [listMovies, setListMovies] = useState<AllFilm[]>([]);

  const loadedMovies = () => {
    instance
      .get("movies")
      .then((res) => {
        setListMovies(res.data.movies);
      })
      .catch((err) => console.log("err:", err));
  };

  useEffect(() => {
    loadedMovies();
  }, []);

  const maxSearchCount = Math.max(...listMovies.map((e) => e.searchCount));
  const calculateHeight = (searchCount: number) => {
    let heightPercent = (searchCount / maxSearchCount) * 100;
    return `${heightPercent}%`;
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <div>
          <h1>Thống kê lượt xem của từng bộ phim trên iQIYI</h1>
        </div>

        <div className="mt-5">
          <div className="chart_layout">
            {listMovies.map((e, i) => (
              <div data-title={e.movie} className="__layout_item" key={i}>
                <div className="fs-6">{e.searchCount}</div>
                <div
                  className="layout_item"
                  style={{ height: calculateHeight(e.searchCount) }}
                ></div>
                <Link to={`/statistical/${e.movieId}`}>
                  <button className="btn_show">Show</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistical;
