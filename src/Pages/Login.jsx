import {RxAvatar} from "react-icons/rx";
import {Form, Button} from "react-bootstrap";

import {useContext} from "react";
import {userContext} from "../context/UserProvider";

import AlertDismissible from "../Components/AlertDismissible";

import { useNavigate } from "react-router-dom";

function Login() {


  const navigate = useNavigate()
  const {name, setName, documento, setDocumento, error, setError} =
    useContext(userContext);

  const handleLogin = (e) => {
    e.preventDefault();

   /*  if ([name, documento].includes("")) {
      setError({
        status: true,
        msg: "Complete los campos",
        text: "Por favor complete los campos para poder ingresar en la aplicación",
      });

      return;
    }
    if (name == "pedro" && documento == 123456) {
     
      navigate('/select')

      return;
    }

    setError({
      status: true,
      msg: "Datos incorrectos",
      text: "Verifique sus datos ",
    }); */


    navigate('/scanner')
  };
  return (
    <div className="container  d-flex flex-column justify-content-center   align-items-center  gap-3  col-lg-2 col-sm-12 col-xl-3 col-md-3    w-100  m-auto   vh-100       ">
      <RxAvatar fontSize={"150px"} />

      <div className="container  col-lg-4 col-sm-12 col-xl-6">
        <h1 className="mt-3  mb-3 ">Ingresar</h1>
        <Form onSubmit={handleLogin} className=" d-flex flex-column    gap-3">
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
            variant="danger"
            type="submit"
            className="mt-4  m-auto   col-lg-6 col-sm-12 col-xl-6 col-md-6 ">
            Iniciar Sesión
          </Button>

          {error.status ? (
            <AlertDismissible error={error.msg} text={error.text} />
          ) : (
            ""
          )}
        </Form>
      </div>
    </div>
  );
}

export default Login;
