import React, {useContext , useState } from "react";
import "./App.css";
import ListContext from "./Components/Context/ListContext";
import UserContext from "./Components/Context/User-context";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Post from "./Components/Home/Post/Post";
import MainPage from "./Components/MainScreen/MainPage";
function App() {
  const listCtx = useContext(ListContext)
  const userCtx = useContext(UserContext)
  const val = localStorage.getItem("isLoggedIn") !== "0";
  userCtx.token =  localStorage.getItem("isLoggedIn");
  const [isLoggedIn, setIsLoggedIn] = useState(val);
  const [showPost, setshowPost] = useState(false);
  const[ismanPageOpen , setismainPageOpen] = useState(!val)
  const LoginHandler = () => {
    setIsLoggedIn(true);
    setshowPost(false);
    setismainPageOpen(false)
  };
  const LogoutHandler = () => {
    localStorage.setItem("isLoggedIn" , "0");
    listCtx.items = []
    setIsLoggedIn(false);
    setshowPost(false);
    setismainPageOpen(true)
  };
  const PostHandler = () => {
    setshowPost(!showPost)
  };
  const mainPageHandler = () => {
    setismainPageOpen(!ismanPageOpen)
  }
  return (
    <React.Fragment>
      <Header
        ShowSignIn ={false}
        ShowSignUp ={false}
        onShowPost={PostHandler}
        onLogout={LogoutHandler}
        isLoggedIn={isLoggedIn}
      />
      {isLoggedIn && showPost && <Post isPost = {showPost} list={listCtx.items} />}
      {isLoggedIn && !showPost && <Home/>}
      {/* <Route path="/main"> */}
      {ismanPageOpen && <MainPage onSignUp={mainPageHandler} onSignIn={LoginHandler} />}
      {/* </Route> */}
      </React.Fragment>
  );
}

export default App;
