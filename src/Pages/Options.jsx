import {Button} from "react-bootstrap";

import {GiEntryDoor} from "react-icons/gi";
import {GiExitDoor} from "react-icons/gi";
import {GiNightSleep} from "react-icons/gi";
import { useContext } from "react";
import { userContext } from "../context/UserProvider";
function Options() {


  const {name} = useContext(userContext)




  return (
    <div className="container border-1 w-100 vh-100   d-flex  flex-column  justify-content-center   m-auto col-lg-6   col-sm-12 col-xl-6 col-md-10 ">
      <Button 

        onClick={()=>console.log(name)}
        variant="success"
        type="submit"
        className=" w-100    m-auto d-flex  flex-column justify-content-center  align-items-center     gap-2  shadow-lg   ">
        <GiExitDoor fontSize={"150px"} />
        <p className="fs-4 fw-semibold   text-center "> Entrada</p>
      </Button>

      <Button
        variant="primary"
        type="submit"
        className="   w-100    m-auto d-flex  flex-column justify-content-center  align-items-center     gap-2 shadow-lg   ">
        <GiNightSleep fontSize={"150px"} />
        <p className="fs-4 fw-semibold  text-center ">Descanso</p>
      </Button>

      <Button
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
