import { createContext } from "react";

const ListContext = createContext(
    {
        update : () => {} ,
        add : (post) => {},
    }
)
export default ListContext;