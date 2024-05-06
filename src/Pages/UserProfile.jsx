import {useContext} from "react";
import {userContext} from "../context/UserProvider";
import { Button } from "react-bootstrap";
function UserProfile() {
  const {name, tipo,avatarUser} = useContext(userContext);

  const validationType = (type) => {
    switch (type) {
      case "entrada":
        return <div className="h-100  d-flex gap-4  flex-column justify-content-between ">
          <h3>Bienvenido</h3>

          <Button  onClick={()=>console.log(tipo)} variant={'success'} >Marcar entrada</Button>
        </div>;
  
      case "descanso":
        return <div>
        <h3>Buen descanso </h3>

        <Button onClick={()=>console.log(tipo)} variant={'primary'} >Marcar descanso</Button>
      </div>;

      case "salida":
        return <div>
        <h3>Buen descanso</h3>

        <Button onClick={()=>console.log(tipo)} variant={'danger'} >Marcar salida</Button>
      </div>;

      default:
        break;
    }
  };


  console.log(avatarUser);

  return (
    <div className="container vh-100   d-flex  flex-column  justify-content-center  align-items-center ">

            <img  className="w-25  h-52  rounded-circle  shadow-lg "  src= {avatarUser} alt="usuario" />


      <div className="d-flex flex-column  text-center  gap-2 mt-4 ">
      <h3 className="fs-5 text-primary  "> {name}</h3>
    
    <h3 className="fs-3 ">  {validationType(tipo)}</h3>
      </div>
    </div>
  );
}

export default UserProfile;
