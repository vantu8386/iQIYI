import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../css/play.css";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Album, PlayOne, Rankes } from "../entities/film.entiti";
import { Categoty } from "../entities/category.entiti";
import ReactPlayer from "react-player";
import Rank from "../components/Rank";
import Comments from "../components/Comments";
import { AllComment } from "../entities/comments.entiti";
import instance from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PlayPages: React.FC = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  let { idVideo, idChap } = useParams();
  const [category, setCategory] = useState<Categoty[]>([]);
  const [toggle, setToggle] = useState(false);
  const [play, setPlay] = useState<PlayOne>();
  const [album, setAlbum] = useState<Album[]>([]);
  const [comments, setComments] = useState<AllComment[]>([]);
  const [call, setCall] = useState<boolean>(true);
  const [ranks, setRanks] = useState<Rankes[]>([]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const [idMovie, setIdMovie] = useState<any>(idVideo);
  const [active, setActive] = useState(Number(idVideo));
  const maxEpisode = 2;
  const [canClick, setCanClick] = useState(true);

  const loadRank = () => {
    instance
      .get("movies/moviesCount")
      .then((res) => {
        // console.log(res.data.result);
        setRanks(res.data.result)
      })
      .catch((err) => {
        console.error("Lỗi khi tải dữ liệu:", err);
      });
  };
  

  const loadcategory = () => {
    instance
      .get("category")
      .then((res) => {
        setCategory(res.data.category);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    instance
      .get(`movies/review/${idChap}`)
      .then((res) => {
        setAlbum(res.data.listAlbum);
      })
      .catch((err) => console.log("err:", err));
  }, [idChap]);

  const playPhim = () => {
    instance
      .get(`movies/play/${idMovie}`)
      .then((res) => {
        console.log("ss",res.data.play);
        
        setPlay(res.data.play[0]);
      })
      .catch((err) => console.log(err));
  };

  // comments
  useEffect(() => {
    instance
      .get(`comments/${idMovie}`)
      .then((res) => {
        setComments(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [idMovie, call]);

  useEffect(() => {
    loadcategory();
    playPhim();
    loadRank();
  }, []);

  useEffect(() => {
    playPhim();
  }, [idMovie]);

  useEffect(() => {
    navigate(`/play/${idMovie}/reviewId/${idChap}`);
  }, [idMovie]);

  const handleActiveMovie = async (id: number) => {
    if (!token && id > maxEpisode) {
      // Nếu chưa đăng nhập và người dùng cố gắng click vào tập phim lớn hơn maxEpisode, hiển thị thông báo.
      toast.error(`Bạn cần phải đăng nhập để xem tập này`);
      return;
    }

    if (canClick) {
      setActive(id);
      setIdMovie(id);
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable={false}
      />
      <Navbar category={category} />
      <div className="mt-24 px-48 text-white">
        <div className="play_film ">
          <div className="">
            <div className="play">
              <ReactPlayer width={1200} height={640} controls url={play?.url} />
            </div>
            <div className="flex justify-between mx-10 text-gray-400 py-3">
              <div className="flex">
                <div className=" flex items-center mx-4 cursor-pointer hover:text-green-500">
                  <i className="fa-solid fa-book-medical"></i>
                  <span className="px-2">Sưu tập</span>
                </div>
                <div className="flex items-center mx-4 cursor-pointer hover:text-green-500">
                  <i className="fa-regular fa-share-from-square"></i>
                  <span className="px-2">Chia sẻ</span>
                </div>
              </div>
              <div className="flex">
                <div className="flex items-center mx-4 cursor-pointer hover:text-green-500">
                  <i className="fa-solid fa-tv"></i>
                  <span className="px-2">Xem trên tivi</span>
                </div>
                <div className="flex items-center mx-4 cursor-pointer hover:text-green-500">
                  <i className="fa-solid fa-download"></i>
                  <span className="px-2">Tải về App</span>
                </div>
              </div>
            </div>
          </div>
          <div className="tap_phim">
            <div className="flex justify-center py-3 px-3">
              <h1 className="text-xl font-bold">{play && play.movie}</h1>
            </div>
            <div className="flex justify-between text-green-400 py-3">
              <p className="bg-gray-700 py-3 px-10 cursor-pointer hover:text-white">
                Chọn tập
              </p>
              <p className="bg-gray-700 py-3  px-6 cursor-pointer hover:text-white">
                Nội dung đặc sắc
              </p>
            </div>
            <div className="bg-yellow-200 rounded-xl text-black mx-4 mt-2">
              <p className="p-4 text-lg">
                Đăng kí VIP, để tận hưởng nội dung độc quyền!
              </p>
            </div>
            <div className="mx-4 my-3">Chọn tập 1-{maxEpisode}</div>
            <div className="px-4 flex flex-wrap gap-3 mt-5">
              {album?.map((ab) => (
                <div key={ab.albumId}>
                  <button
                    onMouseEnter={() => {
                      if (!token && ab.albumId > maxEpisode) {
                        setCanClick(false);
                      }
                    }}
                    onMouseLeave={() => {
                      setCanClick(true);
                    }}
                    onClick={() => handleActiveMovie(ab.albumId)}
                    style={
                      active === Number(ab.albumId)
                        ? {
                            borderRadius: "3px",
                            width: 30,
                            height: 30,
                            backgroundColor: "red",
                          }
                        : {
                            borderRadius: "3px",
                            width: 30,
                            height: 30,
                            backgroundColor: "#333",
                          }
                    }
                  >
                    {ab.episode}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* ---- */}
        <div className="flex">
          <div className="--w80">
            <div className=" my-5">
              <div className="title flex items-center hover:text-green-500">
                <h1 className="font-semibold text-5xl">{play && play.movie}</h1>{" "}
                <Link to={`/review/${idChap}`}>
                  <span className="xem_them mt-7 ml-2 text-lg font-medium">
                    Xem thêm
                  </span>
                </Link>
                <i className="fa-solid fa-angle-right mt-7 mx-2"></i>
                <span className="tap font-semibold text-5xl text-gray-400">
                  Tập
                </span>
                <span className="font-semibold text-5xl text-gray-400">
                  {play && play.episode}
                </span>
              </div>

              <div>
                <div className="flex items-center mt-5">
                  <span className="px-2 bg-green-500 font-semibold">Top1</span>
                  <span className="px-2 font-semibold bg-gray-600">
                    Danh sách phim truyen hinh mới
                  </span>
                  <span className="--n2023">2023</span>
                  <span className="--tap_phim">24 tập</span>
                  <div>
                    {toggle ? (
                      <span
                        className="cursor-pointer hover:text-green-500"
                        onClick={handleToggle}
                      >
                        Thu gọn giới thiệu{" "}
                        <i className="fa-solid fa-angle-up"></i>
                      </span>
                    ) : (
                      <span
                        className="cursor-pointer hover:text-green-500"
                        onClick={handleToggle}
                      >
                        Hiển thị thêm <i className="fa-solid fa-angle-down"></i>
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  {toggle && (
                    <p>
                      <span className="text-gray-500">Miêu tả:</span>{" "}
                      {album[0].describes}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <hr className="my-10 mr-20" />
            <div className="mr-20">
              <Comments
                comments={comments}
                movieID={idMovie}
                callFunction={setCall}
                call={call}
              />
            </div>
          </div>
          <div className="--w20 ">
            <div className="mt-20 ml-10">
              <Rank ranks={ranks} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlayPages;
