import { useState, useEffect } from "react"
import CardEmployee from "../../Components/AdminComponents/CardEmployee"
import { useContext } from "react"

import { connectcontext } from "../../context/ConnectProvider"
function PanelUsers() {

const {URL} = useContext(connectcontext)


const[employees,setEmployees] = useState('')



const getAllUsers = async()=> {

  const response = await fetch(`${URL}/employees`)


  const dataResponse = await response.json()


  setEmployees(dataResponse)
    


}


useEffect(() => {
 

  getAllUsers()
  
}, [])



  return (
    <section className="col-md-12  col-sm-12  d-flex     justify-content-evenly flex-wrap  p-3 gap-3   ">

    

      {employees && employees.map((e,k)=> {


        return <CardEmployee key={k} name={e.nombre} surname={e.apellido} adreess={e.direccion} hospital={e.p_salud}  hours={e.totalHoras} phone={e.tel} pic={e.pic_url}   />


      })}
   
        

        
    </section>
  )
}

export default PanelUsers