import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import { Categoty } from "../entities/category.entiti";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSearchResults } from "../redux/searchSlice";
import { AppDispatch } from "../redux/store";
import { UserName1 } from "../entities/user.entiti";
import instance from "../api/axios";

const Navbar = ({ category }: { category: Categoty[] }) => {
  const userID = localStorage.getItem("id");
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [userN, setUserN] = useState<UserName1[]>([]);

  const userName = localStorage.getItem("UserName");
  // const avatarUser = localStorage.getItem("avatarUser");

  const handleLogout = () => {
    localStorage.removeItem("UserName");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("avatarUser");
  };
  if (userName) {
    setTimeout(() => {
      handleLogout();
      navigate("/");
    }, 3600000);
  }
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const loadUser = () => {
    instance
      .get(`users/${userID}`)
      .then((res) => {
        setUserN(res.data.resultUser);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {

    loadUser();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      axios
        .get(`http://localhost:3000/api/v1/movies/query?search=${search}`)
        .then((res) => {
          // console.log("nav",res.data.message);
          const searchResults = res.data.result;
          const searchMessage = res.data.message;

          dispatch(
            setSearchResults({ result: searchResults, message: searchMessage })
          );

          navigate({
            pathname: "/search",
            search: `term=${search}`,
          });
        })
        .catch((err) => console.log(err));
    }, 1000);
  };

  return (
    <div>
      <nav className="fixed top-0 w-full z-50">
        <div className="flex items-center justify-between bg-black h-20 text-gray-300">
          <div>
            <div className="flex items-center">
              <Link to={"/"}>
                <h1 className="font-bold text-green-500 text-4xl p-5 pl-14 cursor-pointer">
                  iQIYT
                </h1>
              </Link>
              <Link
                to={"/"}
                className="hover:text-green-500 font-semibold ml-10 text-lg  "
              >
                Đề xuất
              </Link>
              {category.length > 0 &&
                category.map((e, i) => (
                  <Link
                    key={i}
                    to={`/${e.categoryId}`}
                    className="hover:text-green-500 font-semibold ml-10 text-lg  "
                  >
                    {e.categoryName}
                  </Link>
                ))}
            </div>
          </div>
          <div className="flex items-center ">
            <div className="flex-grow w-60 h9 flex items-center rounded-md shadow-md">
              <form
                onSubmit={handleSubmit}
                className="flex items-center w-full"
              >
                <input
                  type="text"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-grow  outline-none focus:border-blue-500 rounded-l-md p-2 input-style"
                  placeholder="Tìm kiếm..."
                />
                <span className="border-l"></span>
                <button
                  type="submit"
                  className="input-style bg-zinc-700 text-white rounded-r-md p-2 "
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
            </div>

            <div className="flex flex-col items-center hover:text-green-500 font-semibold ml-10 text-lg cursor-pointer">
              <i className="fa-regular fa-clock"></i>
              <p>Lịch sử xem</p>
            </div>

            <div className="flex flex-col items-center hover:text-green-500 font-semibold ml-10 text-lg cursor-pointer">
              <i className="fa-solid fa-globe"></i>
              <p>Ngôn ngữ</p>
            </div>

            {userName ? (
              <>
                <div className="relative px-10">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    <img
                      className="w-8 h-8 rounded-full"
                      src={userN[0]?.avatarUser}
                      alt=""
                    />
                  </div>
                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-zinc-900 ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link
                          to={"/settings"}
                          onClick={toggleDropdown}
                          className="flex items-center gap-3  px-4 py-2 bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-blue-400"
                        >
                          <img
                            className="w-10 h-10 rounded-full"
                            src={userN[0]?.avatarUser}
                            alt=""
                          />
                          <p>{userN[0]?.userName}</p>
                        </Link>
                        <Link
                          to={"#"}
                          onClick={toggleDropdown}
                          className="flex items-center gap-3  px-4 py-2 text-white hover:bg-zinc-700 hover:text-white"
                        >
                          <i className="fa-solid fa-layer-group"></i>
                          <p>Danh sách đã lưu</p>
                        </Link>
                        <Link
                          to={"/settings"}
                          onClick={toggleDropdown}
                          className="flex items-center gap-3  px-4 py-2 text-white hover:bg-zinc-700 hover:text-white"
                        >
                          <i className="fa-solid fa-gear"></i>
                          <p>Cài đặt cá nhân</p>
                        </Link>

                        <Link
                          to={"/"}
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2 text-white hover:bg-zinc-700 hover:text-white"
                        >
                          <i className="fa-solid fa-right-to-bracket"></i>
                          <p onClick={toggleDropdown}>Đăng xuất</p>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={openModal}
                  className="flex flex-col items-center hover:text-green-500 font-semibold ml-10 text-lg cursor-pointer mr-20"
                >
                  <i className="fa-solid fa-user"></i>
                  <p>Đăng nhập</p>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      <div>
        {isOpen && (
          <div className=" modal-content fixed inset-0 z-50">
            <div className="">
              <Login isOpen={isOpen} closeModal={closeModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
