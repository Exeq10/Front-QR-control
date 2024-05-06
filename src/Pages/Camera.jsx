import  {useRef, useState, useEffect} from "react";
import jsQR from "jsqr";
import {Button, Spinner} from "react-bootstrap";

import AlertDismissible from "../Components/AlertDismissible";
import {useNavigate} from "react-router-dom";

import {useContext} from "react";
import {userContext} from "../context/UserProvider";

const Camera = () => {
  const navigate = useNavigate();

  const {setQrData, qrData, setError, error} = useContext(userContext);

  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);

  const [showCamera, setShowCamera] = useState(true); // Nuevo estado para controlar si se muestra la cámara
  const [loading, setLoading] = useState(false); // Nuevo estado para controlar el estado de carga

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
          setShowCamera(false); // Ocultar la cámara después de escanear un código QR
          setLoading(false); // Detener el estado de carga después de escanear un código QR
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

  const startCamera = async () => {
    try {
      setLoading(true); // Iniciar el estado de carga cuando se inicia el escaneo
      const stream = await navigator.mediaDevices.getUserMedia({video: true});
      videoRef.current.srcObject = stream;
      setScanning(true);
      setError(false);
      setQrData(null);
      setShowCamera(true); // Mostrar la cámara cuando se inicia el escaneo
    } catch (error) {
      setError({
        status: true,
        msg: "Error al acceder a la cámara",
        text: "Por favor habilite su camara ",
      });
    }
  }; /* 'Error al acceder a la cámara: ', error */

  useEffect(() => {
    if (qrData === localStorage.getItem("key_secret")) {
      navigate("/profile");
    } else {
      setError({
        status: true,
        msg: "Intente nuevamente ",
        text: "El QR scaneado no coincide con el usuario ",
      });
    }

    setShowCamera(true);

    if (showCamera) {
      setError(false);
    }
  }, [qrData]);

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
                style={{width: "100%"}}
              />

              <Button variant="success" className="mt-2" onClick={startCamera}>
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
