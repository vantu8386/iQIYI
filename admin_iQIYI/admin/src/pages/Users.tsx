import React, { useState, useEffect } from "react";
import "../css/users.css";
import { ListUsers } from "../entities/user.entities";
import instance from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users: React.FC = () => {
  const [lockedUsers, setLockedUsers] = useState<number[]>([]);
  const [user, setUser] = useState<ListUsers[]>([]);

  const loadedUsers = () => {
    instance
      .get("users")
      .then((res) => {
        setUser(res.data.listUsers);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadedUsers();
  }, []);

  const handleOpen = (id: number) => {
    const open = {
      status: 0,
    };
    instance.put(`users/isBlocked/${id}`, open).then((res) => {
      loadedUsers();
      toast.success("người dùng đã được mở khóa");
      setLockedUsers([...lockedUsers, id]);
    });
  };
  const handleBlock = (id: number) => {
    const block = {
      status: 1,
    };
    instance
      .put(`users/isBlocked/${id}`, block)
      .then((res) => {
        loadedUsers();
        toast.success("Người dùng đã bị khóa.");
        setLockedUsers([...lockedUsers, id]);
      })
      .catch((err) => console.log(err));
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
        <div className="container">
          <h1 className="my-5">Danh sách Users</h1>
          <table className="table table-striped table-hover text-center border">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {user.length > 0 &&
                user.map((u, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{u.userName}</td>
                    <td>{u.email}</td>
                    <td className="action text-center">
                      <div>
                        {u.isBlocked == 1 ? (
                          <button
                            className="khoa"
                            onClick={() => handleOpen(u.userId)}
                          >
                            
                            <i className="fa-solid fa-key"></i>
                            <span>Khóa</span>
                            {/* <span>{u.isBlocked}</span> */}
                          </button>
                        ) : (
                          <button
                            className={"mo_khoa"}
                            onClick={() => handleBlock(u.userId)}
                          >
                            <i className="fa-solid fa-unlock-keyhole"></i>
                            <span>Khóa</span>
                            {/* <span>{u.isBlocked}</span> */}
                          </button>
                        )}
                      </div>
                      {/* <button className="lich_su">
                    <i className="fa-solid fa-repeat"></i>
                    <span>Lịch sử xem</span>
                  </button> */}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Users;
