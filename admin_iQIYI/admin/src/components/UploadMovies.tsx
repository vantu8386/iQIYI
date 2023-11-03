import React, { useEffect, useState } from "react";
import "../css/upload.css";
import { Categoty } from "../entities/category.entities";

import instance from "../api/axios";
import { AddMovie } from "../entities/movies.entities";
import apiClouddinary from "../api/apiCloudinary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Movies } from "../enums/movie.enum";

const UploadMovies: React.FC<{ loadMovies: () => void }> = ({ loadMovies }) => {
  const [category, setCategory] = useState<Categoty[]>([]);
  const [videoURL, setVideoURL] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [uploadMovie, setUploadMovie] = useState<AddMovie>({
    movie: "",
    reviewUrl: "",
    image: "",
    daoDien: "",
    dienVien: "",
    describes: "",
    namPhatHanh: 0,
    categoryId: 0,
  });

  const { movie, daoDien, dienVien, describes, namPhatHanh, categoryId } =
    uploadMovie;

 

  const loadcategory = () => {
    instance
      .get("category")
      .then((res) => {
        // console.log(res.data.category);
        setCategory(res.data.category);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadcategory();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setUploadMovie({ ...uploadMovie, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const selectedFile = files[0];
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", Movies.preset_key);
      formData.append("folder", Movies.folderMovie);

      const formDataImg = new FormData();
      formDataImg.append("file", selectedFile); // Sử dụng formDataImg để tải lên ảnh
      formDataImg.append("upload_preset", Movies.preset_key);
      formDataImg.append("folder", Movies.folderImage); // Folder để tải lên ảnh

      apiClouddinary
        .post(`${Movies.cloud_name}/video/upload`, formData)
        .then((res) => setVideoURL(res.data.secure_url));
      apiClouddinary
        .post(`${Movies.cloud_name}/image/upload`, formDataImg) // Sử dụng formDataImg để tải lên ảnh
        .then((res) => setImageURL(res.data.secure_url)); // Lưu trữ URL của ảnh đại diện
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contentMovie = {
      movie,
      reviewUrl: videoURL,
      image: imageURL,
      daoDien,
      dienVien,
      describes,
      namPhatHanh,
      categoryId,
    };

    if (videoURL && imageURL) {
      instance
        .post("movies/addMovie", contentMovie)
        .then((res) => {
          toast.success(res.data.message);

          setTimeout(() => {
            loadMovies()
          }, 1000);
        })
        .catch((err) => console.log(err));
    } else {
      alert("Loading");
    }
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
      <div className="">
        <div className="row">
          <div className="">
            <form onSubmit={handleSubmit} className="upload-form">
              <div className="mb-3">
                <label htmlFor="movieName" className="form-label">
                  Tên phim
                </label>
                <input
                  name="movie"
                  value={movie}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  id="movieName"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="director" className="form-label">
                  Đạo diễn
                </label>
                <input
                  name="daoDien"
                  value={daoDien}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  id="director"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="actors" className="form-label">
                  Diễn viên
                </label>
                <textarea
                  name="dienVien"
                  value={dienVien}
                  onChange={handleChange}
                  className="form-control"
                  id="actors"
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Mô tả
                </label>
                <textarea
                  name="describes"
                  value={describes}
                  onChange={handleChange}
                  className="form-control"
                  id="description"
                ></textarea>
              </div>

              <div className="mb-3 row">
                <div className="col-md-6">
                  <label htmlFor="review" className="form-label">
                    Review Phim
                  </label>
                  <input
                    name="reviewUrl"
                    onChange={handleFileChange}
                    type="file"
                    className="form-control"
                    id="review"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="image" className="form-label">
                    Ảnh đại diện phim
                  </label>
                  <input
                    name="image"
                    onChange={handleFileChange}
                    type="file"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="namPhatHanh">Năm phát hành</label>
                <input
                  name="namPhatHanh"
                  value={namPhatHanh}
                  onChange={handleChange}
                  type="number"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="genre" className="form-label">
                  Thể loại
                </label>
                <select
                  name="categoryId"
                  value={uploadMovie.categoryId}
                  className="form-select"
                  id="genre"
                  onChange={handleChange}
                >
                  <option value="">--- Vui long chon ---</option>
                  {category.map((e, i) => (
                    <option key={i} value={e.categoryId}>
                      {e.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" d-flex justify-content-between mb-3">
                <button
                  className=" btn btn-secondary"
                  type="button"
                  data-bs-dismiss="modal"
                >
                  <i className="fa-solid fa-left-long"></i>
                </button>
                <button
                  type="submit"
                  className=" btn btn-primary "
                  data-bs-dismiss="modal"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadMovies;
