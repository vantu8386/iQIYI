import React, { useState, useEffect } from "react";
import { Categoty } from "../entities/category.entities";
import { AllFilm } from "../entities/movies.entities";
import instance from "../api/axios";
import Navbar from "../components/Navbar";
import "../css/category.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadMovies from "../components/UploadMovies";
// import MovieItem from "../components/MovieItem";
import ModalUpdateMovie from "../modal/ModalUpdateMovie";
import ModalDelete from "../modal/ModalDelete";
import { Link } from "react-router-dom";

const Category: React.FC = () => {
  const [listMovies, setListMovies] = useState<AllFilm[]>([]);
  const [category, setCategory] = useState<Categoty[]>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState<number | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<AllFilm | null>(null);

  const loadcategory = () => {
    instance
      .get("category")
      .then((res) => {
        // console.log(res.data.category);
        setCategory(res.data.category);
      })
      .catch((err) => console.log(err));
  };

  const loadMovies = () => {
    instance
      .get("/admin/movies")
      .then((res) => {
        // console.log(res.data.movies);
        setListMovies(res.data.result);
      })
      .catch((err) => console.log("err:", err));
  };

  useEffect(() => {
    loadcategory();
    loadMovies();
  }, []);

  const handleDelete = (id: number) => {
    setAlbumToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    instance
      .delete(`album/${albumToDelete}`)
      .then((res) => {
        toast.success(res.data.message);
        loadMovies();
      })
      .catch((err) => console.log("err:", err));
    setIsDeleteModalVisible(false);
  };
  const cancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  const handleUpdate = (id: AllFilm) => {
    // console.log("id:", id);
    setSelectedAlbum(id);
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
        <Navbar category={category} />

        <div className="m-5 d-flex justify-content-between">
          <h1 className="">Danh sách Phim</h1>
          <div>
            {/* <Link to={"/upload-movie"}> */}
            <button
              type="button"
              className="add_movie"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <i className="fa-solid fa-plus "></i>
              <span>Thêm Phim</span>
            </button>
            {/* </Link> */}

            {/* Modal */}
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Thêm phim mới
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <UploadMovies loadMovies={loadMovies} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* table */}

        <div className="Tên Phim">
          <table className="table table-striped table-hover text-center border">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Phim</th>
                <th scope="col">Tên Phim</th>
                <th scope="col">Thể Loại</th>
                <th scope="col">Số tập phim</th>
                <th scope="col">Đạo diễn</th>
                <th scope="col">Diễn Viên</th>
                <th scope="col">Mô Tả</th>
                <th scope="col">Hành Động</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {listMovies.map((e: any, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>
                    <img width={100} height={50} src={e.image} alt="" />
                  </td>
                  <td>
                    <span>{e.movie}</span>
                  </td>
                  <td>{e.categoryName}</td>
                  <td>{e.tapPhim}</td>
                  <td>{e.daoDien}</td>
                  <td className="shorten-text">{e.dienVien}</td>
                  <td className="shorten-text">{e.describes}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleUpdate(e)}
                      className="category_update"
                      data-bs-toggle="modal"
                      data-bs-target="#update"
                    >
                      <span>Sửa</span>
                    </button>

                    <button
                      onClick={() => handleDelete(e.movieId)}
                      className="category_delete"
                    >
                      <span>Xóa</span>
                    </button>
                    <ModalDelete
                      isVisible={isDeleteModalVisible}
                      onConfirm={confirmDelete}
                      onCancel={cancelDelete}
                    />
                    <Link to={`/category/upload/${e.movieId}`}>
                      <button className="category_add">
                        <span>Add Album</span>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal */}
      <div
        className={`modal fade`}
        id="update"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <ModalUpdateMovie selectedAlbum={selectedAlbum} />
      </div>
    </>
  );
};

export default Category;
