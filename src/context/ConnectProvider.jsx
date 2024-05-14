
import {  createContext } from "react"


const connectcontext = createContext()

const URL = 'https://backend-qr-control.onrender.com/api'
function ConnectProvider({children}) {
  return (
    
    <connectcontext.Provider value={{
        URL
    }}>


        {children}
    </connectcontext.Provider>
  )
}


export {connectcontext}
export default ConnectProvider