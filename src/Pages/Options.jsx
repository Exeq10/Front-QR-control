import {useEffect} from "react";

import {Button} from "react-bootstrap";

import {GiEntryDoor} from "react-icons/gi";
import {GiExitDoor} from "react-icons/gi";
import {GiNightSleep} from "react-icons/gi";
import {useContext} from "react";
import {userContext} from "../context/UserProvider";
import {useNavigate} from "react-router-dom";

function Options() {
  const {setTipo, tipo} = useContext(userContext);

  const navigate = useNavigate();

  const handleOption = (e) => {
    setTipo(e);
    navigate("/camera");
  };

  useEffect(() => {
    console.log(tipo);
  }, [tipo]);

  return (
    <div className="container border-1 w-100 vh-100   d-flex  flex-column  justify-content-center   m-auto col-lg-6   col-sm-12 col-xl-6 col-md-10 ">
      <Button
        onClick={() => handleOption("entrada")}
        variant="success"
        type="submit"
        className=" w-100    m-auto d-flex  flex-column justify-content-center  align-items-center     gap-2  shadow-lg   ">
        <GiExitDoor fontSize={"150px"} />
        <p className="fs-4 fw-semibold   text-center "> Entrada</p>
      </Button>

      <Button
        onClick={() => handleOption("descanso")}
        variant="primary"
        type="submit"
        className="   w-100    m-auto d-flex  flex-column justify-content-center  align-items-center     gap-2 shadow-lg   ">
        <GiNightSleep fontSize={"150px"} />
        <p className="fs-4 fw-semibold  text-center ">Descanso</p>
      </Button>

      <Button
        onClick={() => handleOption("salida")}
        variant="danger"
        type="submit"
        className="    w-100    m-auto d-flex  flex-column justify-content-center  align-items-center     gap-2 shadow-lg  ">
        <GiEntryDoor fontSize={"150px"} />
        <p className="fs-4 fw-semibold  text-center ">Salida</p>
      </Button>
    </div>
  );
}

export default Options;
