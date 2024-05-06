import {useContext, useState} from "react";

import {Form, Button} from "react-bootstrap";
import AlertDismissible from "../Components/AlertDismissible";
import {userContext} from "../context/UserProvider";
import {useNavigate} from "react-router-dom";

function Login() {
  const {name, setName, documento, setDocumento, error, setError, setAuth,setAvataruser} =
    useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica si los campos están vacíos
    if (!name || !documento) {
      setError({
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
    console.log(data);

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
          setError({
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
              console.log(responseData);
              setAvataruser(responseData.pic_url)
              setAuth(true);
              navigate("/");
            } else {
              setError({
                status: true,
                msg: "Usuario incorrecto",
                text: "El usuario no es el propietario de este dispositivo",
              });
            }
          } else {
            localStorage.setItem("key_secret", responseData.key_secret);

            setError({
              status: true,
              msg: "Usuario confirmado",
              text: "El usuario se confirmó correctamente",
            });
          }

          /* valida la clave que registro el usuario en su dispositivo con la que intenta ingresar el usuario  */
        }
      } else {
        throw new Error("Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" bg-white  shadow-lg  p-2   container d-flex flex-column justify-content-center align-items-center  col-lg-2 col-sm-12 col-xl-3 col-md-3 w-100 m-auto vh-100">
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
                setError({status: false, msg: "", text: ""});
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
                setError({status: false, msg: "", text: ""});
              }}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="mt-4 m-auto col-lg-6 col-sm-12 col-xl-6 col-md-6"
            disabled={isLoading}>
            {isLoading ? "Iniciando Sesión..." : "Iniciar Sesión"}
          </Button>
          {error.status && (
            <AlertDismissible error={error.msg} text={error.text} />
          )}
        </Form>
      </div>
    </div>
  );
}

export default Login;
