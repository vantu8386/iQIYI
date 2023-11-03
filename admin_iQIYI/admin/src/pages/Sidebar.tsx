import { Link } from "react-router-dom";
import "../css/sidebar.css";

const Sidebar = () => {
  return (
    <>
      <div
        className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark"
        style={{
          minHeight: "100vh",
          maxHeight: "100vh",
          position: "sticky",
          top: 0,
        }}
      >
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <Link
            to={"/"}
            className="d-flex align-items-center pb-3 mb-md-0 me-md-auto  text-decoration-none"
          >
            <span className="logo_iQIYI d-none d-sm-inline">iQIYI</span>
          </Link>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li className="">
              <div className=" dropdown pb-2">
                <Link
                  to={"#"}
                  className=" d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                  id="dropdownUser1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-house"></i>
                  <span className=" d-none d-sm-inline mx-1">Home</span>
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-dark text-small shadow"
                  aria-labelledby="dropdownUser1"
                >
                  <li>
                    <Link className="dropdown-item" to={"/"}>
                      Total views
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/"}>
                      Number of registered users
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link
                to={"/category"}
                className="nav-link px-0 align-middle css_text"
              >
                <i className="fa-solid fa-layer-group"></i>
                <span className=" ms-1 d-none d-sm-inline">Category</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/users"}
                //   data-bs-toggle="collapse"
                className="nav-link px-0 align-middle css_text"
              >
                <i className="fa-solid fa-user-group"></i>
                <span className=" ms-1 d-none d-sm-inline">Users</span>{" "}
              </Link>
            </li>
            <li>
              <Link
                to={"/statistical"}
                className="nav-link px-0 align-middle css_text"
              >
                <i className="fa-solid fa-signal"></i>
                <span className=" ms-1 d-none d-sm-inline">
                  Statistical
                </span>{" "}
              </Link>
            </li>
          </ul>
          <hr />
          <div className="dropdown pb-4">
            <Link
              to={"#"}
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt="hugenerd"
                width={30}
                height={30}
                className="rounded-circle"
              />
              <span className="d-none d-sm-inline mx-1">Setting</span>
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-dark text-small shadow"
              aria-labelledby="dropdownUser1"
            >
              <li>
                <Link className="dropdown-item" to={"/login"}>
                  New Movie
                </Link>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to={"/"}>
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
