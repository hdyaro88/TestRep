import { useState } from "react";
import UserContext from "./User-context";

const Usercontextprovider = (props) => {
    const [UserToken , setUserToken] = useState("l");
     const addUserHandler = (token) => {
         setUserToken(token);
     }
     const removeUserHandler = () => {
        setUserToken(null);
     }
    const userContext = {
        token : UserToken , 
        addUser : addUserHandler ,
        removeUser : removeUserHandler
    }
    return(
     <UserContext.Provider value={userContext}>
         {props.children}
     </UserContext.Provider>
    )
}
export default Usercontextprovider;