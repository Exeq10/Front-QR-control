import {useContext, useState, useEffect} from "react";

import {Form, Button} from "react-bootstrap";


import {Link, useNavigate} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import adminContext from "../../context/AdminProvider";
import { connectcontext } from "../../context/ConnectProvider";

const notifyError = (error) => toast.error(error);
const notifySuccess = (error) => toast.success(error);

function LoginAdmin() {
  const {
    nameAdmin,
        setnameAdmin,
        authAdmin,
        setAuthAdmin,
        messageAdmin,
        setMessageAdmin,
        avatarAdmin,
        setavatarAdmin,
        documentoAdmin,
        setDocumentoAdmin
  } = useContext(adminContext);


const {URL}= useContext(connectcontext)

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica si los campos están vacíos
    if (!nameAdmin || !documentoAdmin) {
      setMessageAdmin({
        status: true,
        msg: "Complete los campos",
        text: "Por favor complete los campos para poder ingresar en la aplicación",
      });

      return;
    }

    // Datos a enviar en la petición POST
    const data = {
      nombre: nameAdmin,
      documento: documentoAdmin,
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

    const url = `${URL}/loginAdmin`;

    try {
      const response = await fetch(url, requestOptions);

      if (response) {
        const responseData = await response.json();

        if (responseData.message) {
          setMessageAdmin({
            status: true,
            msg: "Verifique sus datos ",
            text: responseData.message,
          });
          return;
        }

      if(responseData.nombre) {

        setnameAdmin(responseData.nombre)
        setavatarAdmin(responseData.pic_url)
        setAuthAdmin(true)
        navigate('/dashboard')
        
      }
          
        
      } else {
        throw new Error("Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setMessageAdmin({
        status: true,
        msg: "Error",
        text: "Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (messageAdmin.status) {
      if (messageAdmin.msg === "Complete los campos") {
        notifyError(messageAdmin.text);
      } else if (messageAdmin.msg === "Verifique sus datos ") {
        notifyError(messageAdmin.text);
      } else if (messageAdmin.msg === "Usuario incorrecto") {
        notifyError(messageAdmin.text);
      } else if (messageAdmin.msg === "Usuario confirmado") {
        notifySuccess(messageAdmin.text);
      } else if (messageAdmin.msg === "Error") {
        notifyError(messageAdmin.text);
      }
    }
  }, [messageAdmin]);

  return (
    <div className=" bg-white  shadow-lg  p-2   container d-flex flex-column justify-content-center align-items-center  col-lg-2 col-sm-12 col-xl-3 col-md-3 w-100 m-auto vh-100">
      <Toaster />

      <div className="container-sm col-sm-12 col-md-10 col-lg-6 col-xl-6 d-flex justify-content-center align-items-center m-auto">
        <img src="./logoadmin.png" alt="logo" className="d-block col-6" />
      </div>

      <div className="container col-lg-4 col-sm-12 col-xl-6">
        <h1 className="fs-2  mb-3">Administrador</h1>
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre"
              value={nameAdmin}
              onChange={(e) => {
                setnameAdmin(e.target.value);
                setMessageAdmin({status: false, msg: "", text: ""});
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Documento</Form.Label>
            <Form.Control
              type="text"
              placeholder="documento"
              value={documentoAdmin}
              onChange={(e) => {
                setDocumentoAdmin(e.target.value);
                setMessageAdmin({status: false, msg: "", text: ""});
              }}
            />
          </Form.Group>
          <Button
            variant="success"
            type="submit"
            className={`${isLoading ? "mt-4 m-auto col-lg-6 col-sm-12 col-xl-6 col-md-6 parpadeo" : "mt-4 m-auto col-lg-6 col-sm-12 col-xl-6 col-md-6"} `}
            disabled={isLoading}>
            {isLoading ? "Iniciando Sesión..." : "Iniciar Sesión"}
          </Button>
        </Form>
      </div>

      <Link to={'/login'}  className="text-decoration-none  mt-4 "   >  Usuario  </Link>
    </div>
  );
}

export default LoginAdmin;
