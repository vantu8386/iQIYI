import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/login.css";
import { Signin } from "../entities/user.entiti";
import instance from "../api/axios";

const Login: React.FC<{ isOpen: boolean; closeModal: () => void }> = ({
  isOpen,
  closeModal,
}) => {
  const [signin, setSignin] = useState<Signin>({
    email: "",
    passwords: "",
  });

  const { email, passwords } = signin;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignin({ ...signin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signinForm = {
      email,
      passwords,
    };
    instance
      .post("users/signin", signinForm)
      .then((res) => {
        // console.log(res.data.message);
        if (res.data.message) {
          toast.warning(res.data.message);
        } else {
          console.log(res.data);
          toast.success(res.data.messages);
          localStorage.setItem("UserName", res.data.Username);
          localStorage.setItem("id", res.data.UserID);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("avatarUser", res.data.avatarUser);
          setTimeout(() => {
            closeModal();
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message) {
          toast.warning(err.response.data.message);
        }
      });
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
      <div className=" flex items-center justify-center h-screen ">
        <div className="login w-96 p-4">
          <div className="flex justify-between items-center">
            <p className=" my-8">
              Chào mừng bạn đến với{" "}
              <span className=" font-bold text-green-500">iQIYT</span>.
            </p>
            <i
              onClick={closeModal}
              className="fa-solid fa-x cursor-pointer hover:text-red-500"
            ></i>
          </div>
          <div className="flex items-center  bg-blue-500 text-white p-1 rounded-lg  hover:bg-blue-600 cursor-pointer">
            <img
              className="w-10 h-10  bg-white justify-start rounded-lg"
              src="../../../images/google.png"
              alt=""
            />
            <button className="px-11 py-2">Đăng nhập bằng Google</button>
          </div>
          <hr className="my-8" />
          <form onSubmit={handleSubmit}>
            <div className="my-8">
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
                className="w-full p-3 border outline-none rounded focus:border-green-500 text-green-500 "
              />
            </div>
            <div className="my-8">
              <label htmlFor="">Mật Khẩu</label>
              <input
                type="password"
                placeholder="Mật khẩu"
                name="passwords"
                value={passwords}
                onChange={handleChange}
                className="w-full p-3 border outline-none rounded focus:border-green-500 text-green-500 "
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="--btn bg-lime-600 my-4 font-bold text-white text-xl w-full py-2 rounded hover:bg-green-600"
              >
                Đăng Nhập
              </button>
            </div>
            <div className="flex justify-center">
              <p className="cursor-pointer">Quên mật khẩu?</p>
            </div>
          </form>
          <hr className="my-4" />
          <div className="flex justify-center">
            <Link to={"/register"} className="w-full">
              <button className="bg-blue-500 my-4 font-bold text-white text-xl w-full py-2 rounded hover:bg-blue-600">
                Tạo tài khoản
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
