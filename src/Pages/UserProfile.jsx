import { useContext, useEffect } from "react";
import { userContext } from "../context/UserProvider";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function UserProfile() {
  const notifySuccess = (not) =>
    toast.success(`Se ha registrado correctamente su marca a la hora ${not}`);
  const navigate = useNavigate();

  const notifyError = (error) => toast.error(error);
  const { name, tipo, avatarUser, user_id, setMessage, message } = useContext(
    userContext
  );

  const createRegister = async (register) => {
    const data = {
      usuario: user_id,
      tipo: register,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(
        "https://backend-qr-control.onrender.com/api/marcar-registro",
        requestOptions
      );

      const responseData = await response.json();

      if (response.ok) {
        if (responseData.marcaTiempo) {
          notifySuccess(responseData.marcaTiempo);

          setTimeout(() => {
            navigate("/login");
          }, 5000);
        } else {
          throw new Error("No se recibió marcaTiempo en la respuesta");
        }
      } else {
        if (responseData.error) {
          setMessage({
            status: true,
            msg: "Error de marca",
            text: responseData.error,
          });
          

          setTimeout(() => {
            navigate("/");
          }, 5000);
        } else {
          throw new Error("Error al registrar marca");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (message.status && message.msg === "Error de marca") {
      notifyError(message.text);
    }
  }, [message]);

  const handleRegister = (registerType) => {
    createRegister(registerType);
  };

  const validationType = (type) => {
    switch (type) {
      case "entrada":
        return (
          <div className="h-100 d-flex gap-4 flex-column justify-content-between">
            <h3>Bienvenido</h3>
            <Button onClick={() => handleRegister(type)} variant={"success"}>
              Marcar entrada
            </Button>
          </div>
        );
      case "descanso":
        return (
          <div>
            <h3>Buen descanso </h3>
            <Button onClick={() => handleRegister(type)} variant={"primary"}>
              Marcar descanso
            </Button>
          </div>
        );
      case "salida":
        return (
          <div>
            <h3>Buen descanso</h3>
            <Button onClick={() => handleRegister(type)} variant={"danger"}>
              Marcar salida
            </Button>
          </div>
        );
      default:
        break;
    }
  };

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      <Toaster />
      <img
        className="w-25 h-52 rounded-circle shadow-lg"
        src={avatarUser}
        alt="usuario"
      />
      <div className="d-flex flex-column text-center gap-2 mt-4">
        <h3 className="fs-5 text-primary"> {name}</h3>
        <h3 className="fs-3"> {validationType(tipo)}</h3>
      </div>
    </div>
  );
}

export default UserProfile;
