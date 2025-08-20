import { useState } from "react";
import Swal from "sweetalert2";
import API from "../api";

type FormT = {
  title: string;
  description?: string;
  start_at: string;
  end_at: string;
};

export default function VotingScheduler() {
  const [form, setForm] = useState<FormT>({
    title: "",
    description: "",
    start_at: "",
    end_at: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await API.post("/events", form);
      Swal.fire("Berhasil", "Event tersimpan & akan start/end otomatis.", "success");
      setForm({ title: "", description: "", start_at: "", end_at: "" });
    } catch (err: any) {
      Swal.fire("Gagal", err?.response?.data?.message || "Error", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-4 rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">Jadwalkan Periode Voting</h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          type="text"
          name="title"
          placeholder="Judul Event"
          className="form-control"
          value={form.title}
          onChange={onChange}
          required
        />
        <textarea
          name="description"
          placeholder="Deskripsi (opsional)"
          className="form-control"
          value={form.description}
          onChange={onChange}
        />
        <label className="form-label">Mulai</label>
        <input
          type="datetime-local"
          name="start_at"
          className="form-control"
          value={form.start_at}
          onChange={onChange}
          required
        />
        <label className="form-label">Selesai</label>
        <input
          type="datetime-local"
          name="end_at"
          className="form-control"
          value={form.end_at}
          onChange={onChange}
          required
        />

        <button
          type="submit"
          className="btn btn-primary w-100 mt-2"
          disabled={submitting}
        >
          {submitting ? "Menyimpan..." : "Simpan Jadwal"}
        </button>
      </form>
    </div>
  );
}