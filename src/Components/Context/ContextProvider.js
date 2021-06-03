import { useContext, useState } from "react";
import ListContext from "./ListContext";
import UserContext from "./User-context";
const ContextProvider = (props) => {
  const userCtx = useContext(UserContext);
  const [list , setlist] = useState([]);
  const updateHandler = (post) => {
    fetch(
      `https://auth-9ff9e-default-rtdb.firebaseio.com/${userCtx.token}/${post.id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify(post),
      }
    );
    const existingPostId = list.findIndex(pst => pst.id === post.id);
    const updatedLsit = [...list];
    updatedLsit[existingPostId] = post;
    setlist(updatedLsit);
  };

  const addPostHandler = (post) => {
    fetch(
      `https://auth-9ff9e-default-rtdb.firebaseio.com/${userCtx.token}.json`,
      {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
      setlist(prevState => {
          return [...prevState , post];
      })
  };
  const listHandler = (newlist) => {
      setlist(newlist);
  }
  const deleteHandler = (id) => {
    fetch(`https://auth-9ff9e-default-rtdb.firebaseio.com/${userCtx.token}/${id}.json` , {
        method : "DELETE" ,
    });
    const updatedLsit = list.filter(post => post.id !== id);
    setlist(updatedLsit)
  }
  const listContext = {
      items : list ,
      getlist : listHandler,
    update: updateHandler,
    add: addPostHandler,
    delete : deleteHandler
  };

  return (
    <ListContext.Provider value={listContext}>
      {props.children}
    </ListContext.Provider>
  );
};
export default ContextProvider;
