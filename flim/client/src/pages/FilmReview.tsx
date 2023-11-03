import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../css/filmReview.css";
import { useNavigate, useParams } from "react-router-dom";
import { Album } from "../entities/film.entiti";
import { Categoty } from "../entities/category.entiti";
import ReactPlayer from "react-player";
import instance from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FilmReview: React.FC = () => {
  const token = localStorage.getItem("token");

  const [category, setCategory] = useState<Categoty[]>([]);
  const [album, setAlbum] = useState<Album[]>([]);

  const maxEpisode = 2;
  const [canClick, setCanClick] = useState(true);

  const navigate = useNavigate();

  let { idParam } = useParams();

  const loadcategory = () => {
    instance
      .get("category")
      .then((res) => {
        setCategory(res.data.category);
      })
      .catch((err) => console.log(err));
  };

  // Tăng lượt xem tập phim
  const loadAlbum = () => {
    instance
      .get(`movies/review/${idParam}`)
      .then((res) => {
        setAlbum(res.data.listAlbum);
      })
      .catch((err) => console.log("err:", err));
  };

  const handlePlay = async (id: number) => {
    if (!token && id > maxEpisode) {
      // Nếu chưa đăng nhập và người dùng cố gắng click vào tập phim lớn hơn maxEpisode, hiển thị thông báo.
      toast.error(`Bạn cần phải đăng nhập để xem tập này`);
      return;
    }

    if (canClick) {
      await instance
        .put(`/movies/album/count/${id}`)
        .then(() => {
          navigate(`/play/${id}/reviewId/${idParam}`);
        })
        .catch((err) => console.log("err:", err));
    }
  };

  useEffect(() => {
    loadcategory();
    loadAlbum();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable={false}
      />
      <div className="bg-content text-white">
        <div>
          <Navbar category={category} />
        </div>
        {/* ============= */}

        <div>
          <div className="review relative  w-full top-20">
            <div className="w-2/5 absolute top-3/4 transform -translate-y-1/2 h-4/5 z-10 px-10">
              <h1 className="movie-name">
                {album.length > 0 && album[0].movie}
              </h1>
              <div className="my-4">
                <div className="actor-list">
                  Diễn viên chính: {album.length > 0 && album[0].dienVien}
                </div>
              </div>
              <div className="focus-info-desc allShow">
                <span>
                  <p>
                    Miêu tả:{" "}
                    <span>{album.length > 0 && album[0].describes}</span>
                  </p>
                </span>
              </div>
              <div className="flex font-semibold my-5">
                <button className="button-gray mr-4 flex items-center p-2 px-4 rounded-lg hover:bg-green-500">
                  <i className="fa-solid fa-play mr-3"></i> Chiếu phát
                </button>
                <button className="button-gray mr-4 flex items-center p-2 px-4 rounded-lg hover:bg-green-500">
                  <i className="fa-solid fa-arrow-up-from-bracket mr-3"></i>{" "}
                  Chia sẻ
                </button>
                <button className="button-gray mr-4 flex items-center p-2 px-4 rounded-lg hover:bg-green-500">
                  <i className="fa-solid fa-mobile-screen-button mr-3"></i> App
                </button>
                <button className="button-gray mr-4 flex items-center p-2 px-4 rounded-lg hover:bg-green-500">
                  <i className="fa-solid fa-bookmark mr-3"></i>Sưu tập
                </button>
              </div>
            </div>
            <div className="w-3/5 absolute mt-80 transform -translate-y-1/2 right-0 ">
              <ReactPlayer
                width={1200}
                height={600}
                playing={true}
                url={(album.length > 0 && album[0].reviewUrl) || ""}
              />
              <div className="gradient-overlay"></div>
            </div>
          </div>
          <div className="mt-20 px-10">
            <hr />
            <h1 className="font-bold text-2xl mt-5 mb-5">Chọn tập phim</h1>

            <div className="flex flex-wrap gap-4">
              {album.length > 0 ? (
                album.map((albm: Album, i) => (
                  <div
                    onMouseEnter={() => {
                      if (!token && albm.albumId > maxEpisode) {
                        setCanClick(false);
                      }
                    }}
                    onMouseLeave={() => {
                      setCanClick(true);
                    }}
                    onClick={() => handlePlay(albm.albumId)}
                    key={i}
                    className="tap_phim  cursor-pointer bg-black hover:text-green-500"
                  >
                    <ReactPlayer
                      controls={false}
                      width={350}
                      height={200}
                      url={albm.url}
                    />
                    <p className="font-semibold text-lg my-3">
                      {albm.movie} tập {albm.episode}
                    </p>
                  </div>
                ))
              ) : (
                <p className=" text-3xl mb-6 font-semibold  text-yellow-300 animate-pulse">
                  Nội dung phim chưa được cập nhật. Vui lòng quay lại sau !
                </p>
              )}
            </div>
          </div>
        </div>
        {/* ============= */}
        <Footer />
      </div>
    </>
  );
};

export default FilmReview;
