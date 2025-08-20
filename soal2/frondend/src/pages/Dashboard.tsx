import { useEffect, useState } from "react";

interface User {
  name: string;
  role: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Super Admin Dashboard</h2>
      <div className="alert alert-primary" role="alert">
        Selamat datang, <strong>{user?.name || "Super Admin"}</strong> 🎉
      </div>

      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">User Management</h5>
              <p className="card-text">Kelola akun pengguna</p>
              <a href="/users" className="btn btn-primary">
                Kelola
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Voting</h5>
              <p className="card-text">Atur voting baru</p>
              <a href="/voting" className="btn btn-success">
                Buat Voting
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Hasil Voting</h5>
              <p className="card-text">Lihat hasil voting</p>
              <a href="/results" className="btn btn-warning">
                Lihat Hasil
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Pengaturan</h5>
              <p className="card-text">Atur sistem</p>
              <a href="/settings" className="btn btn-secondary">
                Pengaturan
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
