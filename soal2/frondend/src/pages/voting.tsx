import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../api/axios";
import { Link } from "react-router-dom";

interface Event {
  id: number;
  name: string;
  start_at: Date;
  end_at: Date;
  description: string;
  kandidat_count: number;
}

const Voting: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");

        setEvents(res.data.data || []);
      } catch (error) {
        console.error("Gagal mengambil events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="text-center p-3">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h2 className="mb-4">Daftar Event</h2>
      </div>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-4 mb-3" key={event.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{event.description}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Jumlah Kandidat: {event.kandidat_count}
                  </small>
                </p>
                <p>
                  Status:{" "}
                  {(() => {
                    const now = new Date();
                    const start = event.start_at
                      ? new Date(event.start_at)
                      : null;
                    const end = event.end_at ? new Date(event.end_at) : null;

                    if (start && now < start) {
                      return "Belum dimulai";
                    } else if (start && end && now >= start && now <= end) {
                      return "Sedang berlangsung";
                    } else if (end && now > end) {
                      return "Selesai";
                    } else {
                      return "-";
                    }
                  })()}
                </p>

                <Link
                  to={`/voting/${event.id}`}
                  className="btn btn-primary w-100"
                >
                  Lihat Kandidat
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Voting;
