import React, { useState } from "react";
import "../css/login.css";
import { Signin } from "../entities/user.entities";
import instance from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [signin, setSignin] = useState<Signin>({
    userName: "",
    passwords: "",
  });

  const {userName, passwords} = signin

  const navigate = useNavigate()

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSignin({ ...signin, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signinForm = {
      userName,
      passwords,
    };
    instance
      .post("users/admin/signin", signinForm)
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
            navigate("/")
          },1500)
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
      <section className="login vh-100 ">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className=" col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 ">
                  <h3 className="mb-5">Admin iQIYI</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <label className="form-label " htmlFor="typeEmailX-2">
                        User Name
                      </label>
                      <input
                        type="text"
                        placeholder="Tài khoản"
                        name="userName"
                        value={userName}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="typePasswordX-2">
                        Password
                      </label>
                      <input
                        type="password"
                        placeholder="Mật khẩu"
                        name="passwords"
                        value={passwords}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                      />
                    </div>
                    <button
                      className="__btn btn btn-lg btn-block w-100"
                      type="submit"
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
