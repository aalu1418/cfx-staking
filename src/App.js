import React from "react";
import StakeMenu from "./stakeMenu/stakeMenu";
import Nav from "./nav/nav";
import Alert from "./alert/alert";
import "./App.css";

function App() {
  const [value, set] = React.useState(false);
  const [chainID, setChainID] = React.useState(1);
  const connected = { value, set };
  const [tx, setTx] = React.useState(undefined);

  React.useEffect(() => {
    if (!!window.conflux) {
      window.conflux.on("networkChanged", () => {
        console.log("network change");
        setChainID(window.conflux.networkVersion);
      });
    }
  }, [connected.value]);

  return (
    <div className="App">
      <Nav connected={connected} />
      <StakeMenu connected={connected} setTx={setTx} chainID={chainID} />
      <Alert chainID={chainID} tx={tx} />
    </div>
  );
}

export default App;
