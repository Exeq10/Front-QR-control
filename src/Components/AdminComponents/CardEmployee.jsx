import { CiClock2 } from "react-icons/ci";
import { FaPhoneFlip } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { FaHospital } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

import Progress from "../Progress";
function CardEmployee({pic,name,surname,hours,phone,adreess,hospital}) {
  return (
    <div className=" border bg-white max-height  col-md-4 col-sm-12 col-xl-3     border-1 p-3 shadow-sm rounded-2 d-flex flex-column justify-content-center align-items-center   ">


        <div className="w-100 text-end ">
        <Link><FaEdit  color="#0D6EFD" fontSize={25}/></Link>
        </div>

      <picture className="w-100  d-flex  justify-content-center align-items-center  rounded-circle  "  >
        <img  className="col-6 rounded-circle "  src={pic} alt="personal" />
      </picture>

      <h3 className="fs-4 text-body-secondary  "> {name}  {surname} </h3>

<Progress hour={hours} />
      

    <h4 className="fs-6 d-flex justify-content-center align-items-center gap-2  " ><CiClock2 /> Horas trabajadas  </h4>
      <p> {hours}  </p>


     <div className="w-100 d-flex justify-content-center align-items-start gap-2 flex-column  ">
     <p className="d-flex justify-content-center align-items-center gap-2"><FaPhoneFlip />{phone} </p>
      <p className="d-flex justify-content-center align-items-center gap-2"><IoMdHome />{adreess} </p>
      <p className="d-flex justify-content-center align-items-center gap-2"><FaHospital />{hospital} </p>
     </div>

    </div>
  )
}

export default CardEmployee