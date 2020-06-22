import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState(0);
  const [iterator, setIterator] = useState(0);

  const mutatedData = [...data];
  const URL = "http://localhost:5000/";

  const getData = () => {
    axios
      .get(URL)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const tick = setTimeout(() => {
      if (mutatedData.length) {
        setDisplay(mutatedData.shift());
        setData(mutatedData);
      }
    }, 500);
    return () => clearTimeout(tick);
  }, [data]);

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setIterator(value);
  };

  const handleStop = () => {
    setIterator(0);
    setDisplay(0);
  };

  const handlePost = (e) => {
    e.preventDefault();
    axios.post(URL, { numOfIterations: iterator }).then((response) => {
      setData(response.data);
    });
  };

  return (
    <div className="App">
      <h1>Fizzbuzz Mania</h1>
      <h2>Press the button to start!</h2>
      <button style={{ marginBottom: "20px" }} onClick={() => getData()}>
        First 100
      </button>
      <form onChange={(e) => handleChange(e)} onSubmit={(e) => handlePost(e)}>
        <input name="iterator" value={iterator} />
        <button type="submit">Start</button>
        <button onClick={() => handleStop()}>Stop</button>
      </form>
      <h2 className={display.class}>{display.num}</h2>
      <h2>{display.class}</h2>
    </div>
  );
}

export default App;
