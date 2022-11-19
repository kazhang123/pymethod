import "./App.css";
import React, { useState } from "react";

function App() {
  const [args, setArgs] = useState([]);
  const [file, setFile] = useState(null);

  const uploadFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleArgInput = (e) => {
    const argArr = e.target.value.split(",");
    let trimmedArgs = [];
    for (let arg of argArr) {
      let trimmedArg = arg.trim();
      if (trimmedArg !== "") {
        trimmedArgs.push(trimmedArg);
      }
    }
    setArgs(trimmedArgs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file);

    for (let arg of args) {
      data.append("arg", arg);
    }

    fetch("http://127.0.0.1:8888/graph", {
      //change this to your local server
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {}
      );
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="file" onChange={uploadFile} />
        <br />
        <label>
          Program Input:
          <input type="text" name="name" onChange={(e) => handleArgInput(e)} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
