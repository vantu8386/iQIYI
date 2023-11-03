import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Categoty } from "../entities/category.entiti";
import Footer from "../components/Footer";
import instance from "../api/axios";
import ModalUpdateUser from "../modal/ModalUpdateUser";
import { UserName1 } from "../entities/user.entiti";
import apiClouddinary from "../api/apiCloudinary";
import { Movies } from "../enums/movie.enum";

const Settings = () => {
  const [userN, setUserN] = useState<UserName1[]>([]);
  const [category, setCategory] = useState<Categoty[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imageURL, setImageURL] = useState("");

  // const userName = localStorage.getItem("UserName");
  // const avatarUser = localStorage.getItem("avatarUser");
  const userID = localStorage.getItem("id");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const loadcategory = () => {
    instance
      .get("category")
      .then((res) => {
        setCategory(res.data.category);
      })
      .catch((err) => console.log(err));
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
    loadcategory();
    loadUser();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const selectedFile = files[0];
      const formDataImg = new FormData();
      formDataImg.append("file", selectedFile);
      formDataImg.append("upload_preset", Movies.preset_key);
      formDataImg.append("folder", Movies.folderImageAlbum);

      apiClouddinary
        .post(`${Movies.cloud_name}/image/upload`, formDataImg)
        .then((res) => setImageURL(res.data.secure_url));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contentAlbum = {
      avatarUser: imageURL,
    };
    if (imageURL) {
      instance
        .post(`users/avatarUser/${userID}`, contentAlbum)
        .then(() => {
          // toast.success(res.data.message);
          loadUser();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <Navbar category={category} />

      <div className="flex text-white mt-20">
        <div className="w-1/6 bg-zinc-900 h-screen relative">
          <div className="absolute w-full flex items-center gap-3  px-5 py-5 bg-gradient-to-r from-green-800 to-green-400 hover:from-green-600 hover:to-blue-400">
            <img
              className="w-14 h-14 rounded-full"
              src={userN[0]?.avatarUser}
              alt=""
            />
            <p className="font-semibold text-2xl">{userN[0]?.userName}</p>
            <p className="settings_user"></p>
          </div>

          <div className="flex justify-center py-3 my-3 mx-5 mt-24">
            <button className="bg-orange-300 text-black font-semibold text-lg py-2 w-full rounded-lg">
              Gia nhập VIP
            </button>
          </div>
          <div className="flex items-center gap-3 text-xl mb-4 mx-5 cursor-pointer text-green-500">
            <i className="fa-solid fa-user"></i>
            <span className="font-semibold  py-2 w-full rounded-lg">
              Cài đặt cá nhân
            </span>
          </div>
          <div className="bg-zinc-600 h-px border- my-2 mx-5"></div>

          <div className="flex items-center gap-3 py-3 mx-5 cursor-pointer hover:text-green-500">
            <i className="fa-regular fa-clock"></i>
            <span className="font-semibold ">Lịch sử xem</span>
          </div>

          <div className="flex items-center gap-3 py-3 mx-5 cursor-pointer hover:text-green-500">
            <i className="fa-solid fa-layer-group"></i>
            <span>Danh sách đã lưu</span>
          </div>
          <div className="flex items-center gap-3 py-3 mx-5 cursor-pointer hover:text-green-500">
            <i className="fa-solid fa-money-bill-transfer"></i>
            <span>Phim đặt trước</span>
          </div>
          <div className="flex items-center gap-3 py-3 mx-5 cursor-pointer hover:text-green-500">
            <i className="fa-regular fa-closed-captioning"></i>
            <span>Bản phụ đề</span>
          </div>
        </div>
        <div className="w-5/6">
          <div className="mx-96">
            <div className="flex justify-center">
              <h1 className="font-semibold  text-3xl my-10">Cài đặt cá nhân</h1>
            </div>
            <div className="mt-8">
              <p className="my-2 text-zinc-500">Thông tin cá nhân</p>
              <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-lime-400  rounded-lg px-5 py-5">
                <div className="flex items-center gap-3 ">
                  {/* <img
                    className="w-14 h-14 rounded-full"
                    src={userN[0]?.avatarUser}
                    alt=""
                  /> */}
                  <div className="relative">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={toggleDropdown}
                    >
                      <img
                        className="w-14 h-14 rounded-full"
                        src={userN[0]?.avatarUser}
                        alt=""
                      />
                    </div>
                    {isDropdownOpen && (
                      <div className="origin-top-right absolute left- mt-2  rounded-md shadow-lg bg-green-600 ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          <div
                            // onClick={toggleDropdown}
                            className="flex items-center gap-3  px-4 py-2 bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-blue-400"
                          >
                            <form onSubmit={handleSubmit}>
                              <div className="my-2">
                                <input
                                  name="avatarUser"
                                  type="file"
                                  onChange={handleFileChange}
                                  className="w-20"
                                />
                              </div>
                              <div className="my-2">
                                <button className="bg-blue-400 text-black py-1 px-4 rounded-md">
                                  Upload
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="font-semibold text-2xl text-yellow-300 animate-pulse">
                    {userN[0]?.userName}
                  </p>
                </div>
                <div>
                  <b onClick={openModal} className="cursor-pointer">
                    Chỉnh sửa
                  </b>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <p className="my-2 text-zinc-500">VIP</p>
              <div className="flex justify-between items-center rounded-lg px-5 py-5  bg-gradient-to-r from-orange-200 to-orange-300">
                <div>
                  <h2 className="font-semibold text-2xl my-2 text-black">
                    Trở thành Vip
                  </h2>
                  <p className="my-2 text-black">
                    Tham gia VIP để xem kho phim HD, đồng thời còn có thể bỏ qua
                    quảng cáo
                  </p>
                </div>
                <div className="bg-orange-200 text-black py-2 px-5 rounded-md hover:bg-orange-100">
                  <button className="font-semibold text-lg">Đ.Ký VIP</button>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <p className="my-2 text-zinc-500">Tài khoản bảo mật</p>
              <div className=" items-center bg-zinc-900  rounded-lg px-5 py-5">
                <div className="w-full py-2">
                  <span className="text-zinc-500">Email:</span>{" "}
                  <span>tu@gmail.com</span>
                  <div className="bg-zinc-600 h-px border- my-2 "></div>
                </div>
                <div className="w-full py-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-zinc-500">Số điện thoại:</span>{" "}
                      <span>Không được thiết lập</span>
                    </div>
                    <div>
                      <span className="cursor-pointer">Cài đặt</span>
                    </div>
                  </div>
                  <div className="bg-zinc-600 h-px border- my-2 "></div>
                </div>
                <div className="w-full py-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-zinc-500">Mật Khẩu:</span>{" "}
                      <span>Không được thiết lập</span>
                    </div>
                    <div>
                      <span className="cursor-pointer">Sửa đổi</span>
                    </div>
                  </div>
                  <div className="bg-zinc-600 h-px border- my-2 "></div>
                </div>
                <div className="w-full py-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-zinc-500">
                        Quản lý gia hạn tự động:
                      </span>{" "}
                      <span>Không được thiết lập</span>
                    </div>
                    <div>
                      <span className="cursor-pointer">Cài đặt</span>
                    </div>
                  </div>
                  <div className="bg-zinc-600 h-px border- my-2 "></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {isOpen && (
          <div className=" modal-content fixed inset-0 z-50">
            <div className="">
              <ModalUpdateUser
                loadUser={loadUser}
                isOpen={isOpen}
                closeModal={closeModal}
              />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Settings;
