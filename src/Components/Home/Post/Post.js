import { useContext, useEffect, useState} from "react";
import PostItem from "./Postitem";
import TitlePost from "./TitlePost";
import UserContext from "../../Context/User-context";
import styles from "./Post.module.css"
import ListContext from "../../Context/ListContext";


const Post = (props) => {
    const userCtx = useContext(UserContext);
    const listCtx = useContext(ListContext);
    const [showLoading , setShowLoading] = useState(false)
    ///network section
    const refresh = async () => {
      setShowLoading(true);
      const response = await fetch(`https://auth-9ff9e-default-rtdb.firebaseio.com/${userCtx.token}.json`);
      const data = await response.json();
      const fetchedlist = [];
      for(const key in data) {
          if(data[key] != null)
          fetchedlist.push(
              {
               id : key ,
               name : data[key].name ,
               age : data[key].age ,
               relation : data[key].relation
              }
          )
      }
      listCtx.getlist(fetchedlist);
      setShowLoading(false);
   };
   //
     useEffect(() => {
       if(listCtx.items.length === 0)
       refresh();
     },[])

  document.body.style.marginTop = "6rem";
  return (
    <div>
      <TitlePost/>
      {showLoading && listCtx.items.length === 0 && <h1 className={styles.nopost}>Loading Post...</h1>}
      {!showLoading && listCtx.items.length === 0 && <h1 className={styles.nopost}>No Posts Yet</h1>}
      {listCtx.items.map((post) => 
          <PostItem  key = {post.id} id={post.id} name={post.name} age={post.age} relation={post.relation} />
      )}
    </div>
  );
};
export default Post;
