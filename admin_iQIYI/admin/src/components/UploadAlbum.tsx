import React, { useState, useEffect } from "react";
import "../css/album.css";
import "../css/upload.css";
import { useParams } from "react-router-dom";
import { ListIdMovie } from "../entities/album.entities";
import instance from "../api/axios";
import apiClouddinary from "../api/apiCloudinary";
import { Movies } from "../enums/movie.enum";
import { AllFilm } from "../entities/movies.entities";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalDelete from "../modal/ModalDelete";

const UploadAlbum: React.FC = () => {
  const [listMovies, setListMovies] = useState<AllFilm[]>([]);
  const [listAlbum, setListAlbum] = useState<ListIdMovie[]>([]);
  const [videoURL, setVideoURL] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState<number | null>(null);

  const { uploadAlbum } = useParams();

  const loadedMovies = () => {
    instance
      .get(`movies/${uploadAlbum}`)
      .then((res) => {
        // console.log(res.data.movies);
        setListMovies(res.data.movies);
      })
      .catch((err) => console.log("err:", err));
  };

  const loadAlbumData = () => {
    instance
      .get(`movies/movieID/${uploadAlbum}`)
      .then((res) => {
        // console.log(res.data.result);

        setListAlbum(res.data.result);
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    loadedMovies();
    loadAlbumData();
  }, [uploadAlbum]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const selectedFile = files[0];
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", Movies.preset_key);
      formData.append("folder", Movies.folderAlbum);

      const formDataImg = new FormData();
      formDataImg.append("file", selectedFile);
      formDataImg.append("upload_preset", Movies.preset_key);
      formDataImg.append("folder", Movies.folderImageAlbum);

      apiClouddinary
        .post(`${Movies.cloud_name}/video/upload`, formData)
        .then((res) => setVideoURL(res.data.secure_url));
      apiClouddinary
        .post(`${Movies.cloud_name}/image/upload`, formDataImg)
        .then((res) => setImageURL(res.data.secure_url));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const contentAlbum = {
      url: videoURL,
      imageEpisode: imageURL,
      movieId: Number(uploadAlbum),
    };

    if (videoURL && imageURL) {
      instance
        .post("album/addAlbum", contentAlbum)
        .then((res) => {
          toast.success(res.data.message);
          loadAlbumData();
        })
        .catch((err) => console.log(err));
    } else {
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>;
    }
  };

  const handleDelete = (id: number) => {
    setAlbumToDelete(id);
    setIsDeleteModalVisible(true);
  };
    const confirmDelete = () => {
      instance
        .delete(`album/${albumToDelete}`)
        .then((res) => {
          toast.success(res.data.message);
          loadAlbumData();
        })
        .catch((err) => console.log("err:", err));
      setIsDeleteModalVisible(false);
    };
  const cancelDelete = () => {
    setIsDeleteModalVisible(false);
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
      <div className="container mt-5">
        <>
          {/* Button trigger modal */}
          <button
            type="button"
            className="btn btn-primary title_add"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-title={`Thêm tập phim mới cho: ${listMovies[0]?.movie}`}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
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
                    Thêm tập phim mới
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>

                <div className="modal-body">
                  <div className="row">
                    <div className="">
                      <form onSubmit={handleSubmit} className="upload-form">
                        <div className="text-center">
                          <h1 className="mb-4">{listMovies[0]?.movie}</h1>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="filmFile" className="form-label">
                            Tập Phim
                          </label>
                          <input
                            name="episode"
                            onChange={handleFileChange}
                            type="file"
                            className="form-control"
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="filmImage" className="form-label">
                            Ảnh Tập Phim
                          </label>
                          <input
                            name="imageEpisode"
                            onChange={handleFileChange}
                            type="file"
                            className="form-control"
                          />
                        </div>

                        <div className="d-flex justify-content-between mb-3 modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>

                          <button
                            data-bs-dismiss="modal"
                            type="submit"
                            className="btn btn-primary"
                          >
                            Upload
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>

        <div className="mt-5">
          <table className="table table-striped table-hover text-center border">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Phim</th>
                <th scope="col">Tập</th>

                <th scope="col">Hành Động</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {listAlbum.map((e, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>
                    <img width={100} height={50} src={e.imageEpisode} alt="" />
                  </td>
                  <td>Tập {e.episode}</td>

                  <td className="">
                    <button className="category_update">
                      <span>Sửa</span>
                    </button>
                    <button
                      // onClick={handleDelete}
                      onClick={() => handleDelete(e.albumId)}
                      className="category_delete"
                    >
                      <span>Xóa</span>
                    </button>
                    <ModalDelete
                      isVisible={isDeleteModalVisible}
                      onConfirm={confirmDelete}
                      onCancel={cancelDelete}
                    />
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

export default UploadAlbum;
