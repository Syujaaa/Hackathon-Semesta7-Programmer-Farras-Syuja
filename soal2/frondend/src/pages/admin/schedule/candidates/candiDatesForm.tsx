import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../../api/axios";

interface Candidate {
  id?: number;
  name: string;
  vision: string;
  mission: string;
  photo: File | null;
  photo_url?: string;
}

interface Event {
  id: number;
  title: string;
  description?: string;
  start_at: string;
  end_at: string;
  status: string;
}

export default function CandidateForm() {
  const [candidates, setCandidates] = useState<Candidate[]>([
    { name: "", vision: "", mission: "", photo: null },
  ]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate("/jadwal");
      return;
    }

    const checkEvent = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        const data: Event = res.data;

        if (!data) {
          navigate("/jadwal");
          return;
        }

        setEvent(data);
      } catch (error) {
        navigate("/jadwal");
      } finally {
        setLoading(false);
      }
    };

    checkEvent();
  }, [id, navigate]);

  const addCandidate = () => {
    setCandidates([
      ...candidates,
      { name: "", vision: "", mission: "", photo: null },
    ]);
  };

  const removeCandidate = (index: number) => {
    setCandidates(candidates.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof Candidate,
    value: string | File | null
  ) => {
    const updated = [...candidates];
    updated[index][field] = value as never;
    setCandidates(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    candidates.forEach((candidate, index) => {
      formData.append(`candidates[${index}][name]`, candidate.name);
      formData.append(`candidates[${index}][vision]`, candidate.vision);
      formData.append(`candidates[${index}][mission]`, candidate.mission);
      if (candidate.photo) {
        formData.append(`candidates[${index}][photo]`, candidate.photo);
      }
    });

    try {
      const res = await API.post(`/events/${id}/candidates`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Saved:", res.data);
      navigate("/jadwal");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="col-md-6 mt-5 mx-auto">
      <div className="card shadow">
        <div className="card-header text-center p-3">
          <h2>Form Kandidat</h2>
          {event && <small className="text-muted">{event.title}</small>}
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            {candidates.map((candidate, index) => (
              <div key={index} className="mb-4 border-bottom pb-3">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id={`name-${index}`}
                    placeholder="Nama Kandidat"
                    value={candidate.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                  />
                  <label htmlFor={`name-${index}`}>Nama Kandidat</label>
                </div>

                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    id={`vision-${index}`}
                    placeholder="Visi"
                    style={{ height: "100px" }}
                    value={candidate.vision}
                    onChange={(e) =>
                      handleChange(index, "vision", e.target.value)
                    }
                  />
                  <label htmlFor={`vision-${index}`}>Visi</label>
                </div>

                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    id={`mission-${index}`}
                    placeholder="Misi"
                    style={{ height: "100px" }}
                    value={candidate.mission}
                    onChange={(e) =>
                      handleChange(index, "mission", e.target.value)
                    }
                  />
                  <label htmlFor={`mission-${index}`}>Misi</label>
                </div>

                <div className="mb-3">
                  <label className="form-label">Foto Kandidat</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={(e) =>
                      handleChange(
                        index,
                        "photo",
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                  />
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => removeCandidate(index)}
                    disabled={candidates.length === 1}
                  >
                    Hapus Kandidat
                  </button>
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={addCandidate}
              >
                Tambah Kandidat
              </button>

              <button type="submit" className="btn btn-success">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
