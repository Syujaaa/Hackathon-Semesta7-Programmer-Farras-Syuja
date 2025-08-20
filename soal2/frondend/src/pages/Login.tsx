import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faEye,
  faEyeSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "../App.css";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false); 
  const navigate = useNavigate();


  const { authUser, setAuthUser, loading } = useAuth();


  useEffect(() => {
    if (!loading && authUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [authUser, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

   
    const newErrors: { [key: string]: string } = {};
    if (!form.email) newErrors.email = "Email wajib diisi.";
    if (!form.password) newErrors.password = "Password wajib diisi.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await API.post("/login", form);

   
      localStorage.setItem("token", res.data.token);

   
      setAuthUser(res.data.user);

      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Selamat datang kembali!",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setErrors(err.response?.data?.errors || {});
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text:
            err.response?.data?.message ||
            "Email atau password salah. Coba lagi!",
        });
      } else {
        setErrors({ general: "Error!" });
        Swal.fire({
          icon: "error",
          title: "Terjadi Kesalahan",
          text: "Silakan coba lagi nanti.",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="col-md-4 mt-5 mx-auto">
      <div className="card shadow">
        <div className="card-header text-center p-3">
          <h2>Login</h2>
        </div>
        <div className="card-body p-4">
          <form method="post" onSubmit={handleLogin}>
           
            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                placeholder="Email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
              />
              <label htmlFor="email">Email</label>
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            
            <div className="form-floating mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={form.password}
                placeholder="Password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
              />
              <label htmlFor="password">Password</label>
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "15px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="d-flex justify-content-end align-items-end">
              <button
                type="submit"
                className="btn btn-primary mt-3"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                    Loading...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faRightToBracket} /> Login
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
