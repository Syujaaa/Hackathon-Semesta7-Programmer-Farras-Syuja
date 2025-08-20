import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    FaceMesh: any;
    Camera: any;
  }
}

const SelfieCheckin: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [detected, setDetected] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const video = videoRef.current!;
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;

      const faceMesh = new window.FaceMesh({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6,
      });

      faceMesh.onResults((results: any) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
          setDetected(true);

          if (!sent) {
            const photo = canvas.toDataURL("image/jpeg");
            sendPhoto(photo);
          }
        } else {
          setDetected(false);
        }
      });

      const camera = new window.Camera(video, {
        onFrame: async () => {
          await faceMesh.send({ image: video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    };

    init();
  }, [sent]);

  const sendPhoto = async (photo: string) => {
    try {
      setSent(true);
      await axios.post("http://127.0.0.1:8000/api/vote/selfie", {
        selfie: photo,
      });
      navigate("/success");
    } catch (err) {
      console.error("Upload gagal", err);
      setSent(false); 
    }
  };

  return (
    <div className="text-center">
      <h2>Ambil Selfie</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width="640"
        height="480"
        className="border rounded mb-2"
      />

      <canvas ref={canvasRef} width="640" height="480" style={{ display: "none" }} />

      <div className="mt-3">
        {detected ? (
          <span className="badge bg-success">Wajah Terdeteksi ✅</span>
        ) : (
          <span className="badge bg-danger">Tidak ada wajah ❌</span>
        )}
      </div>
    </div>
  );
};

export default SelfieCheckin;
