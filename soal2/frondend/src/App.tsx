import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Sidebar from "./components/SideBar";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import EventForm from "./pages/admin/schedule/VotingScheduleForm";
import VotingIndex from "./pages/admin/schedule/VotingIndex";
import CandidateForm from "./pages/admin/schedule/candidates/candiDatesForm";
import { useState, useEffect } from "react";
import Voting from "./pages/voting";
import KandidatList from "./pages/candidates";
import FaceCheckIn from "./pages/vote";

function AppLayout() {
  return (
    <>
      <Sidebar />
      <div className="container mt-5">
        <div className="d-flex justify-content-center align-items-center mt-5">
          <Routes>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/jadwal/add"
              element={
                <PrivateRoute>
                  <EventForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/jadwal"
              element={
                <PrivateRoute>
                  <VotingIndex />
                </PrivateRoute>
              }
            />
            <Route
              path="/jadwal/plus/:id"
              element={
                <PrivateRoute>
                  <CandidateForm />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
      {/* <div className="mt-auto">
        aaa
        <footer
          className="text-center text-light"
          style={{ backgroundColor: "rgb(18, 38, 49)" }}
        >
          <br />
          <p>&copy; 2025</p>
        </footer>
      </div> */}
    </>
  );
}

function AuthLayout() {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/" element={<Voting />} />
        <Route path="/vote" element={<FaceCheckIn />} />
        <Route path="/voting/:id" element={<KandidatList />} />
      </Routes>
    </>
  );
}

function AppContent() {
  const { authUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  return authUser ? <AppLayout /> : <AuthLayout />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
