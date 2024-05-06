import {useContext, useState, useEffect} from "react";
import "../assets/styles/styles.css";
import {Form, Button} from "react-bootstrap";

import {userContext} from "../context/UserProvider";
import {useNavigate} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";

const notifyError = (error) => toast.error(error);
const notifySuccess = (error) => toast.success(error);

function Login() {
  const {
    name,
    setName,
    documento,
    setDocumento,
    message,
    setMessage,
    setAuth,
    setAvataruser,
    setUser_id,
  } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica si los campos están vacíos
    if (!name || !documento) {
      setMessage({
        status: true,
        msg: "Complete los campos",
        text: "Por favor complete los campos para poder ingresar en la aplicación",
      });

      return;
    }

    // Datos a enviar en la petición POST
    const data = {
      nombre: name,
      documento: documento,
    };

    setIsLoading(true);

    // Configuración de la petición
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const url = `https://backend-qr-control.onrender.com/api/login`;

    try {
      const response = await fetch(url, requestOptions);

      if (response) {
        const responseData = await response.json();

        if (responseData.message) {
          setMessage({
            status: true,
            msg: "Verifique sus datos ",
            text: responseData.message,
          });
          return;
        }

        if (responseData.key_secret) {
          if (localStorage.getItem("key_secret")) {
            if (
              responseData.key_secret === localStorage.getItem("key_secret")
            ) {
              setUser_id(responseData._id);
              setAvataruser(responseData.pic_url);
              setAuth(true);
              navigate("/");
            } else {
              setMessage({
                status: true,
                msg: "Usuario incorrecto",
                text: "El usuario no es el propietario de este dispositivo",
              });
            }
          } else {
            localStorage.setItem("key_secret", responseData.key_secret);

            setMessage({
              status: true,
              msg: "Usuario confirmado",
              text: "El usuario se confirmó correctamente",
            });
          }
        }
      } else {
        throw new Error("Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setMessage({
        status: true,
        msg: "Error",
        text: "Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (message.status) {
      if (message.msg === "Complete los campos") {
        notifyError(message.text);
      } else if (message.msg === "Verifique sus datos ") {
        notifyError(message.text);
      } else if (message.msg === "Usuario incorrecto") {
        notifyError(message.text);
      } else if (message.msg === "Usuario confirmado") {
        notifySuccess(message.text);
      } else if (message.msg === "Error") {
        notifyError(message.text);
      }
    }
  }, [message]);

  return (
    <div className=" bg-white  shadow-lg  p-2   container d-flex flex-column justify-content-center align-items-center  col-lg-2 col-sm-12 col-xl-3 col-md-3 w-100 m-auto vh-100">
      <Toaster />

      <div className="container-sm col-sm-12 col-md-10 col-lg-6 col-xl-6 d-flex justify-content-center align-items-center m-auto">
        <img src="./logo.webp" alt="logo" className="d-block col-6" />
      </div>

      <div className="container col-lg-4 col-sm-12 col-xl-6">
        <h1 className="fs-2  mb-3">Ingresar</h1>
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setMessage({status: false, msg: "", text: ""});
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Documento</Form.Label>
            <Form.Control
              type="text"
              placeholder="documento"
              value={documento}
              onChange={(e) => {
                setDocumento(e.target.value);
                setMessage({status: false, msg: "", text: ""});
              }}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className={`${isLoading ? "mt-4 m-auto col-lg-6 col-sm-12 col-xl-6 col-md-6 parpadeo" : "mt-4 m-auto col-lg-6 col-sm-12 col-xl-6 col-md-6"} `}
            disabled={isLoading}>
            {isLoading ? "Iniciando Sesión..." : "Iniciar Sesión"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
