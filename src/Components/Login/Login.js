import React, { useContext, useRef , useState } from "react";
import UserContext from "../Context/User-context";
import Header from "../Header/Header";
import Button from "../UI/Button";
import Card from "../UI/Card";
import styles from "./Login.module.css";

const Login = (props) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [showLoading , setShowLoading] = useState(false);
    const userCtx = useContext(UserContext)

  const submitHandler = (event) => { 
    event.preventDefault();
    const fetchUser = async () => {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAz3RXmmWWjOWJqInL8kZslzfOhPUUpSBs`;
         const response = await fetch(url , 
          {
                method: "POST",
                body: JSON.stringify({
                  email: enteredEmail,
                  password: enteredPassword,
                  returnSecureToken: true,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              } );
              if(!response.ok) {
                throw new Error("Athuentication Failed");
              }
              const data = await response.json();
              props.onLoggin();
              userCtx.token = data.localId.toString();
              localStorage.setItem("isLoggedIn" , userCtx.token);
            }
            catch(error) {
              console.log(error.message);
            }
    }
    const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        setShowLoading(true)
        fetchUser();
  
  };
  return (
    <React.Fragment>
    <Header onClick={props.onSignUp} ShowSignIn={false} ShowSignUp ={true} />
    <div className={styles.card}>
      <Card>
        <form onSubmit={submitHandler}>
          <div className={styles.item}>
            <label>Email</label>
            <input ref={emailRef} type="email" required="@"></input>
          </div>
          <div className={styles.item}>
            <label>PassWord</label>
            <input ref={passwordRef} type="password" required></input>
          </div>
          <div className={styles.buttonItem}>
          {showLoading &&  <p>Logging ...</p>}
           {!showLoading && <Button className={styles.Login_button}>Login</Button>}
          </div>
        </form>
      </Card>
    </div>
    </React.Fragment>
  );
};
export default Login;
