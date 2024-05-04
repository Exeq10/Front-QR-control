import { createContext ,useState} from "react";



const userContext = createContext()



// eslint-disable-next-line react/prop-types
function UserProvider({children}) {

    /* posibles errores  */

    const [error,setError] = useState({status:false,msg:'',text:''})


    const [name, setName] = useState("");
    const [documento, setDocumento] = useState("")
    const [tipo, setTipo] = useState("")
  
  return (
   

    <userContext.Provider  value={{name,setName,documento,setDocumento,error,setError,setTipo}}>
{children}

    </userContext.Provider>


  )
}

export default UserProvider

// eslint-disable-next-line react-refresh/only-export-components
export {userContext}