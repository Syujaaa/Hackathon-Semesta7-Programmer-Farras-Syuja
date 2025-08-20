import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

import $ from "jquery";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5";

const API_URL = "http://127.0.0.1:8000/api/events";

export default function ProductList() {
  const [Events, setEvents] = useState<any[]>([]);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const dataTableRef = useRef<any>(null);

  const getEvents = async () => {
    try {
      const res = await axios.get(API_URL);
      setEvents(res.data.data);
    } catch (err) {
      console.error("Error fetching Events:", err);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const DeleteData = async (id: number) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus data?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Tidak",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setEvents((prev) => prev.filter((product) => product.id !== id));
        Swal.fire({
          title: "Berhasil menghapus data!",
          icon: "success",
          timer: 1500,
        });
      } catch (err) {
        console.error("Error deleting:", err);
        Swal.fire({
          title: "Gagal menghapus data",
          icon: "error",
        });
      }
    }
  };

  useEffect(() => {
    (window as any).DeleteData = DeleteData;
  }, [DeleteData]);
  useEffect(() => {
    if (!tableRef.current) return;

    if (Events.length > 0) {
      if (dataTableRef.current) {
        dataTableRef.current.destroy();
        dataTableRef.current = null;
      }

      setTimeout(() => {
        dataTableRef.current = ($(tableRef.current!) as any).DataTable({
          processing: true,
          serverSide: false,
          data: Events,
          columns: [
            {
              data: null,
              render: (_: any, __: any, ___: any, meta: any) => meta.row + 1,
            },
            { data: "title" },
            { data: "description" },
            {
              data: null,
              render: (data: any) => {
                const now = new Date();
                const start = data.start_at ? new Date(data.start_at) : null;
                const end = data.end_at ? new Date(data.end_at) : null;

                if (start && now < start) {
                  return "Belum dimulai";
                } else if (start && end && now >= start && now <= end) {
                  return "Sedang berlangsung";
                } else if (end && now > end) {
                  return "Selesai";
                } else {
                  return "-";
                }
              },
            },
            { data: "kandidat_count" },
            {
              data: "id",
              render: (id: number) => `
    <a href="/jadwal/plus/${id}" class="btn btn-warning btn-sm">➕</a>
    <button class="btn btn-danger btn-sm ms-2" onclick="DeleteData(${id})">🗑️</button>
  `,
            },
          ],
          pageLength: 25,
          lengthMenu: [10, 25, 50, 100],
          columnDefs: [
            { className: "text-center", targets: "_all" },
            { className: "text-start", targets: [2] },
          ],
        });
      }, 0);
    }
  }, [Events]);

  return (
    <div className="col-md-10 mt-5">
      <div className="card shadow">
        <div className="card-header text-center p-3">
          <h2>Event List</h2>
        </div>
        <div className="card-body p-4">
          <div className="d-flex justify-content-end mb-3">
            <Link className="btn btn-primary" to={"/jadwal/add"}>
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>

          <table
            ref={tableRef}
            className="display table table-striped table-bordered text-center"
            style={{ width: "100%" }}
            id="myTable"
          >
            <thead>
              <tr>
                <th className="text-center">No</th>
                <th className="text-center">Nama</th>
                <th className="text-center">Deskripsi</th>
                <th className="text-center">Periode</th>
                <th className="text-center">Total kandidat</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {Events.map((event, index) => (
                <tr key={event.id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{event.title}</td>
                  <td className="text-center">
                    <textarea
                      className="form-control"
                      name="description"
                      rows={3}
                      cols={20}
                      readOnly
                      value={event.description}
                    />
                  </td>
                  <td>
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
                  </td>
                  <td>{event.kandidat_count}</td>
                  <td className="text-center">
                    <Link
                      to={`/jadwal/plus/${event.id}`}
                      className="btn btn-warning"
                    >
                      <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger ms-2"
                      onClick={() => DeleteData(event.id)}
                    >
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
