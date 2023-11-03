import React, { useState } from "react";
import { NameUpdate } from "../entities/user.entiti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../api/axios";

const ModalUpdateUser: React.FC<{
  isOpen: boolean;
  closeModal: () => void;
  loadUser: any;
}> = ({ isOpen, closeModal, loadUser }) => {
  const userName = localStorage.getItem("UserName");
  const userID = localStorage.getItem("id");

  const [user, setUser] = useState<NameUpdate>({
    userName: userName || "",
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const update = {
      userName: user.userName,
    };

    const userName = user.userName;
    if (userName.length < 5 || userName[0] !== userName[0].toUpperCase()) {
      toast.warning(
        "Username phải có ít nhất 5 kí tự và bắt đầu bằng chữ cái viết hoa"
      );
      return;
    }

    instance
      .patch(`users/${userID}`, update)
      .then((res) => {
        console.log(res.data);
        closeModal();
        loadUser();
      })
      .catch((err) => console.log("err", err));
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
      <div>
        {isOpen && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="bg-white w-96 p-4 shadow-lg rounded-lg">
              <div className="flex justify-between">
                <h2 className="text-black font-semibold text-xl">
                  Cập nhật thông tin
                </h2>
                <i
                  onClick={closeModal}
                  className="fas fa-times cursor-pointer text-black hover:text-red-500"
                ></i>
              </div>
              <div className="bg-gray-600 h-px my-2"></div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* <input type="file" className="p-2" /> */}
                <input
                  name="userName"
                  value={user.userName}
                  onChange={handleNameChange}
                  className="p-2"
                  type="text"
                />

                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-green-500 hover:bg-green-700 rounded-md"
                >
                  Đồng ý
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ModalUpdateUser;
