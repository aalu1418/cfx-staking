import React from "react";
import StakeMenu from "./stakeMenu/stakeMenu";
import Nav from "./nav/nav";
import "./App.css";

function App() {
  const [value, set] = React.useState(false);
  const connected = { value, set };

  return (
    <div className="App">
      <Nav connected={connected} />
      <StakeMenu connected={connected} />
    </div>
  );
}

export default App;
