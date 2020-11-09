import React, { useState, useEffect } from "react";
//import { Button } from "react-bootstrap";

function Test() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([{ text: "Learn Hooks" }]);
  const handleIncrement = () => setCount(precount => precount + 1);

  const handleincrementFive = () => {
    for (let i = 0; i < 5; i++) {
      handleIncrement();
    }
  };

  useEffect(() => {
    document.title = `clicked ${count} times`;
    return console.log("clean up");
  });

  console.log(todos);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleincrementFive}>Click me</button>{" "}
      <button onClick={() => setCount(20)}>Reset me</button>
    </div>
  );
}

export default Test;
