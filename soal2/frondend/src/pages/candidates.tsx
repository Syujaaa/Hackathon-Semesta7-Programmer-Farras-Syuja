import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { Link } from "react-router-dom";

interface Kandidat {
  id: number;
  name: string;
  vision: string;
  mission: string;
  photo: string;
  deskripsi: string;
}

interface Event {
  id: number;
  title: string;
  start_at: Date;
  end_at: Date;
  description: string;
  kandidat_count: number;
}

const KandidatList: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [kandidats, setKandidats] = useState<Kandidat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate("/jadwal");
      return;
    }

    const fetchKandidats = async () => {
      try {
        const res = await API.get(`/events/${id}/candidates`);
        setKandidats(res.data.data);
      } catch (error) {
        console.error("Gagal ambil kandidat", error);
        navigate("/jadwal");
      } finally {
        setLoading(false);
      }
    };

    fetchKandidats();

    const fetchEvents = async () => {
      try {
        const res = await API.get(`/events/${id}`);

        setEvents(res.data.data || []);
      } catch (error) {
        console.error("Gagal mengambil events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [id, navigate]);

  if (loading) {
    return <div className="text-center mt-5 fs-5">⏳ Loading kandidat...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Daftar Kandidat {events.title}</h2>
        <p className="text-muted">{events.description}</p>
      </div>

      <button className="btn btn-secondary mb-4 " onClick={() => navigate(-1)}>
        Kembali
      </button>

      <div className="row g-4">
        {kandidats.length === 0 ? (
          <div className="text-center text-muted">Belum ada kandidat.</div>
        ) : (
          kandidats.map((kandidat) => (
            <div key={kandidat.id} className="col-md-4 col-sm-6">
              <div className="card h-100 shadow-lg border-0 rounded-4 overflow-hidden">
                <img
                  src={`http://127.0.0.1:8000/storage/${kandidat.photo}`}
                  className="card-img-top"
                  alt={kandidat.name}
                  style={{
                    height: "220px",
                    objectFit: "cover",
                    transition: "0.3s",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-primary">
                    {kandidat.name}
                  </h5>
                  <p className="card-text text-muted" style={{ flexGrow: 1 }}>
                    Visi: {kandidat.vision || "Tidak ada Visi"}
                  </p>
                  <p className="card-text text-muted" style={{ flexGrow: 1 }}>
                    Misi: {kandidat.mission || "Tidak ada Misi"}
                  </p>
                  <Link
                    to="/vote"
                    className="btn btn-primary mt-auto fw-semibold rounded-pill"
                  >
                    Vote{" "}
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default KandidatList;
