import Card from "../UI/Card";
import * as classes from "./Home.module.css";
import Button from "../UI/Button";
import { useContext, useState } from "react";
import ListContext from "../Context/ListContext";

const Home = (props) => {
const listCtx = useContext(ListContext)
  const [name, setname] = useState('');
  const [age, setage] = useState('');
  const [relation, setrelation] = useState('');
  const post = {
    id : Math.random(),
    name: name,
    age: age,
    relation: relation,
  };
   const submitHandler = (event) => {
    event.preventDefault();
    listCtx.add(post)
    setname("");
    setrelation("");
    setage("");
  };
  const updatenameHandler = (event) => {
    const val = event.target.value;
    if (val.trim().lenth === 0) {
      return;
    }
    setname(val);
  };
  const updateageHandler = (event) => {
    const val = event.target.value;
    if (val.trim().lenth === 0) {
      return;
    }
    setage(+val);
  };
  const updaterelationHandler = (event) => {
    const val = event.target.value;
    if (val.trim().lenth === 0) {
      return;
    }
    setrelation(val);
  };
  return (
    <div className={classes.card}>
      <Card>
        <form onSubmit={submitHandler}>
          <div className={classes.item}>
            <label>Name</label>
            <input value={name} required type="text" onChange={updatenameHandler}></input>
          </div>
          <div className={classes.item}>
            <label>Age</label>
            <input value={age} required type="number" onChange={updateageHandler}></input>
          </div>
          <div className={classes.item}>
            <label>Relation</label>
            <input value={relation} required type="text" onChange={updaterelationHandler}></input>
          </div>
          <div className={classes.buttonItem}>
            <Button className={classes.Create_button}>Create Post</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default Home;
