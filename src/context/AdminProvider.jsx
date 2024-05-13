import {createContext, useState} from "react";

const adminContext = createContext();

// eslint-disable-next-line react/prop-types
function AdminProvider({children}) {
  /* posibles messagees  */

  const [messageAdmin, setMessageAdmin] = useState({status: false, msg: "", text: ""});
  const [avatarAdmin, setavatarAdmin] = useState("");
 

  const [nameAdmin, setnameAdmin] = useState("");
  const [documentoAdmin, setDocumentoAdmin] = useState("");
 
  /* autorizacion de logeo  */
  const [authAdmin, setAuthAdmin] = useState(false);

  return (
    <adminContext.Provider
      value={{
        nameAdmin,
        setnameAdmin,
        authAdmin,
        setAuthAdmin,
        messageAdmin,
        setMessageAdmin,
        avatarAdmin,setavatarAdmin,
        documentoAdmin,
        setDocumentoAdmin

      }}>
      {children}
    </adminContext.Provider>
  );
}

export default adminContext;

// eslint-disable-next-line react-refresh/only-export-components
export {AdminProvider};
