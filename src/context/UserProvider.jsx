import {createContext, useState} from "react";

const userContext = createContext();

// eslint-disable-next-line react/prop-types
function UserProvider({children}) {
  /* posibles messagees  */

  const [message, setMessage] = useState({status: false, msg: "", text: ""});
const [avatarUser,setAvataruser]= useState('')
const [user_id,setUser_id]= useState('')

  const [name, setName] = useState("");
  const [documento, setDocumento] = useState("");
  const [qrData, setQrData] = useState(null);
  const [tipo, setTipo] = useState("");




  /* autorizacion de logeo  */
  const [auth, setAuth] = useState(false);

  return (
    <userContext.Provider
      value={{
        name,
        setName,
        documento,
        setDocumento,
        message,
        setMessage,
        setTipo,
        auth,
        setAuth,
        qrData,
        setQrData,
        tipo,
        setAvataruser,
        avatarUser,
        setUser_id,
        user_id
      }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;

// eslint-disable-next-line react-refresh/only-export-components
export {userContext};
