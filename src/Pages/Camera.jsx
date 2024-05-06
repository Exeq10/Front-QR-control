import { useRef, useState, useEffect } from "react";
import jsQR from "jsqr";
import { Button, Spinner } from "react-bootstrap";

import AlertDismissible from "../Components/AlertDismissible";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { userContext } from "../context/UserProvider";

const Camera = () => {
  const navigate = useNavigate();

  const { setQrData, qrData, setError, error } = useContext(userContext);

  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState(null); // Estado para almacenar la cámara seleccionada
  const [showCamera, setShowCamera] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const scanQRCode = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (
        videoRef.current &&
        videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA
      ) {
        const video = videoRef.current;
        const width = video.videoWidth;
        const height = video.videoHeight;

        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);

        const imageData = context.getImageData(0, 0, width, height);
        const code = jsQR(imageData.data, width, height);

        if (code) {
          console.log("Código QR detectado:", code.data);
          setScanning(false);
          setQrData(code.data);
          setShowCamera(false);
          setLoading(false);
        }
      }

      if (scanning) {
        requestAnimationFrame(scanQRCode);
      }
    };

    if (scanning) {
      scanQRCode();
    }

    return () => {
      setScanning(false);
    };
  }, [scanning]);

  useEffect(() => {
    if (selectedCamera) {
      startCamera(selectedCamera);
    }
  }, [selectedCamera]);

  const startCamera = async (deviceId) => {
    try {
      setLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: deviceId ? { exact: deviceId } : undefined }, // Especifica el dispositivo de video seleccionado
      });
      videoRef.current.srcObject = stream;
      setScanning(true);
      setError(false);
      setQrData(null);
      setShowCamera(true);
    } catch (error) {
      setError({
        status: true,
        msg: "Error al acceder a la cámara",
        text: "Por favor habilite su cámara",
      });
    }
  };

  useEffect(() => {
    if (qrData === localStorage.getItem("key_secret")) {
      navigate("/profile");
    } else {
      setError({
        status: true,
        msg: "Intente nuevamente ",
        text: "El QR escaneado no coincide con el usuario",
      });
    }

    setShowCamera(true);

    if (showCamera) {
      setError(false);
    }
  }, [qrData]);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          const cameras = devices.filter(
            (device) => device.kind === "videoinput"
          );
          // Si hay más de una cámara, permitir al usuario seleccionar una
          if (cameras.length > 1) {
            // Mostrar una lista de opciones para que el usuario elija
            const cameraOptions = cameras.map((camera) => ({
              label: camera.label || `Cámara ${camera.deviceId}`,
              value: camera.deviceId,
            }));
            // Puedes mostrar esta lista de opciones al usuario y permitirle seleccionar una cámara
            // Por simplicidad, aquí seleccionamos automáticamente la primera cámara encontrada
            setSelectedCamera(cameraOptions[0].value);
          }
        })
        .catch((error) => {
          console.error("Error al enumerar dispositivos:", error);
        });
    }
  }, []);

  return (
    <section className="vh-100 vw-100 d-flex flex-column justify-content-center align-items-center">
      {error.status ? (
        <AlertDismissible error={error.msg} text={error.text} />
      ) : (
        ""
      )}

      <div className="  container m-auto w-100 h-100   d-flex justify-content-center align-items-center">
        <div className="col-sm-11 col-md-10 col-lg-6  col-xl-6   d-flex flex-column justify-content-center align-items-center">
          {showCamera && (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ width: "100%" }}
              />

              <Button
                variant="success"
                className="mt-2"
                onClick={() => startCamera(selectedCamera)}
              >
                Escanear
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Camera;
