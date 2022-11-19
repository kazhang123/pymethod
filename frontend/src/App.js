import './App.css';
import React from 'react';

function App() {
    const args = new Array(1, 2, "imastring");

    const uploadFile = (e) => {
      const file = e.target.files[0];
      const data = new FormData();
      data.append('file', file);

      for (let i = 0; i < args.length; i++) {
        data.append('arg', args[i]);
      }

      fetch("http://127.0.0.1:8888/graph", {  //change this to your local server
        method: 'POST',
        body: data
      })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
        },
        (error) => {}
      )
  }

  return (
      <div>
        <form>
          <input type="file" onChange={uploadFile}/>
        </form>
      </div>
  );
}

export default App;

