import { useState } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import API from "../../../api/axios";
import { useNavigate } from "react-router-dom";

export default function EventForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    start_at: "",
    end_at: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!form.title) newErrors.title = "Judul wajib diisi.";
    if (!form.start_at) newErrors.start_at = "Tanggal mulai wajib diisi.";
    if (!form.end_at) newErrors.end_at = "Tanggal selesai wajib diisi.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await API.post("/events", form);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: res.data.message,
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/jadwal");
      });

      setForm({
        title: "",
        description: "",
        start_at: "",
        end_at: "",
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.response?.data?.message || "Terjadi kesalahan",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="col-md-6 mt-5 mx-auto">
      <div className="card shadow">
        <div className="card-header text-center p-3">
          <h2>Buat Event Voting</h2>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                id="title"
                name="title"
                value={form.title}
                placeholder="Judul Event"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                onChange={(e) => {
                  setForm({ ...form, title: e.target.value });
                  setErrors((prev) => ({ ...prev, title: "" }));
                }}
              />
              <label htmlFor="title">Judul Event</label>
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <textarea
                id="description"
                name="description"
                value={form.description}
                placeholder="Deskripsi Event"
                className="form-control"
                style={{ height: "100px" }}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <label htmlFor="description">Deskripsi (Opsional)</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="datetime-local"
                id="start_at"
                name="start_at"
                value={form.start_at}
                className={`form-control ${
                  errors.start_at ? "is-invalid" : ""
                }`}
                onChange={(e) => {
                  setForm({ ...form, start_at: e.target.value });
                  setErrors((prev) => ({ ...prev, start_at: "" }));
                }}
              />
              <label htmlFor="start_at">Tanggal Mulai</label>
              {errors.start_at && (
                <div className="invalid-feedback">{errors.start_at}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="datetime-local"
                id="end_at"
                name="end_at"
                value={form.end_at}
                className={`form-control ${errors.end_at ? "is-invalid" : ""}`}
                onChange={(e) => {
                  setForm({ ...form, end_at: e.target.value });
                  setErrors((prev) => ({ ...prev, end_at: "" }));
                }}
              />
              <label htmlFor="end_at">Tanggal Selesai</label>
              {errors.end_at && (
                <div className="invalid-feedback">{errors.end_at}</div>
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
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCalendarPlus} /> Simpan Event
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
