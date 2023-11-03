import React, { useState, useEffect } from "react";
import "../css/thongke.css";
import instance from "../api/axios";
import { AllFilm } from "../entities/movies.entities";
import { useParams } from "react-router-dom";
import { ListIdMovie } from "../entities/album.entities";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowMovies: React.FC = () => {
  const [listMovies, setListMovies] = useState<AllFilm[]>([]);
  const [listAlbum, setListAlbum] = useState<ListIdMovie[]>([]);

  const { movieId } = useParams();

  const loadedMovies = () => {
    instance
      .get(`movies/${movieId}`)
      .then((res) => {
        // console.log(res.data.movies);
        setListMovies(res.data.movies);
      })
      .catch((err) => console.log("err:", err));
  };

  const loadedAlbum = () => {
    instance
      .get(`movies/movieID/${movieId}`)
      .then((res) => {
        setListAlbum(res.data.result);
        // toast.success(res.data.message)
      })
      .catch((err) => console.log("err:", err));
  };

  useEffect(() => {
    loadedMovies();
    loadedAlbum();
  }, [movieId]);

  const maxSearchCount = Math.max(...listAlbum.map((e) => e.searchCount));
  const calculateHeight = (searchCount: number) => {
    let heightPercent = (searchCount / maxSearchCount) * 100;
    return `${heightPercent}%`;
  };

  return (
    <>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable={false}
      />
      <div style={{ width: "100%" }}>
        <div className="album">
          <h1>Nội dung phim</h1>
          <span className="hr"></span>
          <div className="a">
            <div className="vds">
              <img width={250} height={280} src={listMovies[0]?.image} alt="" />
            </div>
            <div className="w-100">
              <p>
                <span className="movie_name">{listMovies[0]?.movie}</span>
              </p>
              <div className="hra w-100"></div>
              <p>
                <b>Đạo diễn: </b>
                <span>{listMovies[0]?.daoDien}</span>
              </p>
              <p>
                <b>Diễn viên: </b>
                <span>{listMovies[0]?.dienVien}</span>
              </p>
              <p>
                <b>Phát hành năm: </b>
                <span>{listMovies[0]?.namPhatHanh}</span>
              </p>
              <p>
                <b>Thể loại: </b>
                <span>{listMovies[0]?.categoryName}</span>
              </p>
            </div>
          </div>
          <div className="mt-3">
            <b>Mô tả: </b>
            <span>{listMovies[0]?.describes}</span>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <div>
            <h1>Thống kê lượt xem của từng tập phim trên iQIYI</h1>
          </div>

          <div className="mt-3">
            <div className="charts_layout">
              {listAlbum.map((e, i) => (
                <div
                  data-title={`Tập ${e.episode}: <${e.searchCount} lượt xem>`}
                  className="__layout_items"
                  key={i}
                >
                  <div className="fs-6">{e.searchCount}</div>
                  <div
                    className="layout_items "
                    style={{ height: calculateHeight(e.searchCount) }}
                  ></div>
                  <button className="btn_shows">Tập {e.episode}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowMovies;
