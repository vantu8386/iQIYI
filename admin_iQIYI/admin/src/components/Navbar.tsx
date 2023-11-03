import { Categoty } from "../entities/category.entities";
import { Link } from "react-router-dom";
import "../css/nav.css";


const Navbar = ({ category }: { category: Categoty[] }) => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"  
        style={{ position: "sticky", top: 0 }}
      >
        <div className="container-fluid">
          <Link to={"/category"} className="navbar-brand">
            Movies
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {category.length > 0 &&
                category.map((e, i) => (
                  <li key={i} className="nav-item">
                    <Link
                      to={`/category/${e.categoryId}`}
                      className="nav-link active"
                      aria-current="page"
                    >
                      {e.categoryName}
                    </Link>
                  </li>
                ))}
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      
    </>
  );
};

export default Navbar;
