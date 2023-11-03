import React, { useState, useEffect } from "react";
import { AllFilm } from "../entities/movies.entities";
import { Categoty } from "../entities/category.entities";
import instance from "../api/axios";

interface ModalUpdateProps {
  selectedAlbum: AllFilm | null;
}

const ModalUpdateMovie: React.FC<ModalUpdateProps> = ({ selectedAlbum }) => {
  const [category, setCategory] = useState<Categoty[]>([]);

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
  console.log("albumToUpdate:", selectedAlbum);
  return (
    <div>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Update thông tin
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="">
              <div className="row">
                <div className="">
                  <form
                    // onSubmit={handleSubmit}
                    className="upload-form"
                  >
                    <div className="mb-3">
                      <label htmlFor="movieName" className="form-label">
                        Tên phim
                      </label>
                      <input
                        name="movie"
                        value={selectedAlbum?.movie}
                        //   onChange={handleChange}
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
                        value={selectedAlbum?.daoDien}
                        //   onChange={handleChange}
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
                        value={selectedAlbum?.dienVien}
                        //   onChange={handleChange}
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
                        value={selectedAlbum?.describes}
                        //   onChange={handleChange}
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
                          //   value={selectedAlbum?.reviewUrl}
                          // onChange={handleFileChange}
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
                          //   value={selectedAlbum?.image}
                          // onChange={handleFileChange}
                          type="file"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="namPhatHanh">Năm phát hành</label>
                      <input
                        name="namPhatHanh"
                        value={selectedAlbum?.namPhatHanh}
                        //   onChange={handleChange}
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
                          value={selectedAlbum?.categoryId}
                        className="form-select"
                        id="genre"
                        //   onChange={handleChange}
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
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateMovie;
