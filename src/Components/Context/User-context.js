import { createContext } from "react";

const UserContext = createContext(
    {
        token : null ,  
        addUser : () => {} ,
        removeUser : () => {} 
    }
);
export default UserContext;