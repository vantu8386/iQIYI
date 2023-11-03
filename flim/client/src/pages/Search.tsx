import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Categoty } from "../entities/category.entiti";
import "../css/search.css";
import { useSelector } from "react-redux";
import { Rankes, SearchMovie } from "../entities/film.entiti";
import { useNavigate } from "react-router-dom";
import Rank from "../components/Rank";
import instance from "../api/axios";

const Search: React.FC = () => {
  const [category, setCategory] = useState<Categoty[]>([]);
  const [ranks, setRanks] = useState<Rankes[]>([]);
  

  const navigate = useNavigate();

  const searchResults = useSelector((state: any) => state.search.searchResults);
  const searchMessage = useSelector((state: any) => state.search.searchMessage);
  const loadcategory = () => {
    instance
      .get("category")
      .then((res) => {
        setCategory(res.data.category);
      })
      .catch((err) => console.log(err));
  };

  const handleReview = async (movieId: number) => {
    await instance
      .put(`/movies/review/count/${movieId}`)
      .then(() => {
        setTimeout(() => {
          navigate(`/review/${movieId}`);
        }, 1000);
      })
      .catch((err) => console.log("err:", err));
  };


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
  

  useEffect(() => {
    loadcategory();
    loadRank();
  }, []);

  return (
    <>
      <Navbar category={category} />

      <div className="mt-20 text-white">
        {/* -------------- */}
        <div className="flex justify-center py-6 bg-gray-800">
          <h1 className="text-xl">
            Dựa theo từ khóa "
            <span className="font-bold text-green-500">{searchMessage}</span>"
            bạn nhập, đã giúp bạn tìm thấy các kết quả tìm kiếm sau đây.
          </h1>
        </div>
        {/* --------------- */}

        <div className="flex my-10 mx-80">
          <div className="w-4/6 ">
            {searchResults.map((result: SearchMovie) => (
              <div key={result.movieId} className=" py-3">
                <div className="my-2">
                  <span>{result.categoryName}</span>
                </div>
                <div className="flex p-3">
                  <div>
                    <img
                      style={{ width: "25 0px", height: "300px" }}
                      src={result.image}
                      alt=""
                    />
                  </div>
                  <div className="ml-5 flex flex-col justify-between">
                    <div>
                      <h1 className="text-3xl">{result.movie}</h1>
                      <p>
                        <span className="text-gray-500 font-semibold">
                          Năm:{" "}
                        </span>
                        {result.namPhatHanh}
                      </p>
                      <p>
                        <span className="text-gray-500 font-semibold">
                          Đạo diễn:{" "}
                        </span>
                        {result.daoDien}
                      </p>
                      <p>
                        <span className="text-gray-500 font-semibold">
                          Diễn viên chính:{" "}
                        </span>
                        {result.dienVien}, Ngu Thư Hân, Trương Lăng Hách, Cheng
                        Lei, Lư Dục Hiểu, Jin Jolin, tianjiarui
                      </p>
                    </div>
                    <div></div>
                    <div className="flex justify-between">
                      <div>
                        <button
                          onClick={() => handleReview(result.movieId)}
                          className="xem_ngay"
                        >
                          Xem ngay
                        </button>
                      </div>
                      <div className="text-green-500 cursor-pointer">
                        Hiển thị thêm...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-2/6 flex justify-center">
            <Rank ranks={ranks} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
