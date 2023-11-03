import { useState } from "react";
import "../css/resgister.css";
import { Signup } from "../entities/user.entiti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios";

const Register: React.FC = () => {
  const [signup, setSignup] = useState<Signup>({
    userName: "",
    email: "",
    passwords: "",
  });

  const { userName, email, passwords } = signup;

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const registerForm = {
      userName,
      email,
      passwords,
    };
    instance
      .post("users/signup", registerForm)
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((err) => {
        console.log("err:", err);
        if (err.response.data.message) {
          toast.warning(err.response.data.message);
        }
      });
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
      <div className=" flex items-center justify-center h-screen ">
        <div className="register w-96 p-4">
          <div>
            <p className="text-gray-400 my-1">
              Miễn phí phim hay tại{" "}
              <span className=" font-bold text-green-500">iQIYT</span>.
            </p>

            <h1 className="my-1 text-3xl font-bold text-black">Đăng ký</h1>
          </div>
          <hr className="my-2" />

          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <input
                type="text"
                placeholder="Họ tên"
                name="userName"
                value={userName}
                onChange={handleChange}
                className="w-full p-3 border outline-none rounded focus:border-green-500 text-green-500"
              />
            </div>
            <div className="my-4">
              <input
                type="email"
                placeholder="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="w-full p-3 border outline-none rounded focus:border-green-500 text-green-500"
              />
            </div>
            <div className="my-4">
              <input
                type="password"
                placeholder="Mật khẩu"
                name="passwords"
                value={passwords}
                onChange={handleChange}
                className="w-full p-3 border outline-none rounded focus:border-green-500 text-green-500"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="--btn my-4 bg-green-500 font-bold text-white text-xl px-12 py-2 rounded hover:bg-green-600"
              >
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
