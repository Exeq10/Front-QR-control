import {useRef, useState, useEffect} from "react";
import jsQR from "jsqr";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {userContext} from "../context/UserProvider";
import toast, {Toaster} from "react-hot-toast";

import { IoQrCodeOutline } from "react-icons/io5";

const Camera = () => {
  const notifyError = (error) => toast.error(error);

  const navigate = useNavigate();
  const {setQrData, qrData, setMessage} = useContext(userContext);

  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState(null);
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
        video: {deviceId: deviceId ? {exact: deviceId} : undefined},
      });
      videoRef.current.srcObject = stream;
      setScanning(true);
      setMessage(false);
      setQrData(null);
      setShowCamera(true);
    } catch (error) {
      notifyError(
        "Error al acceder a la cámara. Por favor habilite su cámara.",
      );
    }
  };

  useEffect(() => {
    if (qrData === localStorage.getItem("key_secret")) {
      navigate("/profile");
    } else if (qrData !== null) {
      notifyError(
        "El QR escaneado no coincide con el usuario. Intente nuevamente.",
      );
    }

    setShowCamera(true);

    if (showCamera) {
      setMessage(false);
    }
  }, [qrData]);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          let selectedDeviceId = null;
          devices.forEach((device) => {
            if (
              device.kind === "videoinput" &&
              !device.label.toLowerCase().includes("front")
            ) {
              selectedDeviceId = device.deviceId;
            }
          });

          if (!selectedDeviceId) {
            const camera = devices.find(
              (device) => device.kind === "videoinput",
            );
            if (camera) {
              selectedDeviceId = camera.deviceId;
            }
          }

          if (selectedDeviceId) {
            setSelectedCamera(selectedDeviceId);
          } else {
            console.warn("No se encontraron cámaras disponibles.");
          }
        })
        .catch((error) => {
          console.log(error);
          notifyError(
            "Error al enumerar dispositivos. Por favor, inténtalo de nuevo más tarde.",
          );
        });
    }
  }, []);

  return (
    <section className="vh-100 vw-100 d-flex flex-column justify-content-center align-items-center">
      <Toaster />
      <div className="  container m-auto w-100 h-100   d-flex justify-content-center align-items-center">
        <div className="col-sm-11 col-md-10 col-lg-6  col-xl-6   d-flex flex-column justify-content-center align-items-center">
          {showCamera && (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{width: "100%"}}
              />
              <Button
                variant="success"
                className="mt-2"
                onClick={() => startCamera(selectedCamera)}>
                <IoQrCodeOutline fontSize={'45px'} />
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Camera;
