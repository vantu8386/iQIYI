import { useState, useEffect } from "react";
import { AllFilm } from "../entities/movies.entities";
import { Categoty } from "../entities/category.entities";
import instance from "../api/axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "../css/category.css";

export const Categoryes: React.FC = () => {
  const [listMovies, setListMovies] = useState<AllFilm[]>([]);
  const [category, setCategory] = useState<Categoty[]>([]);

  const { id } = useParams();

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
    instance
      .get(`admin/movies/${id}`)
      .then((res) => {
        // console.log(res.data);
        setListMovies(res.data.result);
      })
      .catch((err) => console.log("err:", err));
  }, [id]);

  useEffect(() => {
    loadcategory();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Navbar category={category} />

      <div className="Tên Phim">
        <table className="table table-striped table-hover text-center border">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Phim</th>
              <th scope="col">Thể Loại</th>
              <th scope="col">Số tập phim</th>
              <th scope="col">Đạo diễn</th>
              <th scope="col">Diễn Viên</th>
              <th scope="col">Mô Tả</th>
              <th scope="col">Hành Động</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {listMovies.map((e, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{e.movie}</td>
                <td>{e.categoryName}</td>
                <td>{e.tapPhim}</td>
                <td>{e.daoDien}</td>
                <td>{e.dienVien}</td>
                <td className="shorten-text">{e.describes}</td>
                <td className="action text-center">
                  <button className="category_update">
                    <span>Sửa</span>
                  </button>
                  <button className="category_delete">
                    <span>Xóa</span>
                  </button>
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
  );
};
