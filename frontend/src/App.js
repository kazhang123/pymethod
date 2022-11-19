import './App.css';
import React from 'react';

function App() {
    const uploadFile = (e) => {
      const file = e.target.files[0];
      const data = new FormData();
      data.append('file', file);
      
      fetch("http://127.0.0.1:8888/graph", {
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

