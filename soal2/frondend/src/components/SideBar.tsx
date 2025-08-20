import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { authUser, setAuthUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Yakin ingin logout?",
      text: "Kamu akan keluar dari aplikasi",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, logout!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        setAuthUser(null);

        navigate("/login");

        Swal.fire(
          "Logout Berhasil",
          "Anda sudah keluar dari aplikasi",
          "success"
        );
      }
    });
  };

  if (!authUser) {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            System vote
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse mx-auto"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Daftar event
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar bg-body-tertiary fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          {authUser?.name || "Admin"}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              {authUser?.name || "Admin"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"/dashboard"}
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/jadwal"}>
                  Voting
                </Link>
              </li>

              <li className="nav-item mt-auto">
                <a onClick={handleLogout} className="nav-link" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
