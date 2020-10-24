import React from "react";
import "./stakeMenu.css";
import logo from "../assets/cfx_logo.svg";
import {checkBalance} from "../assets/blockchain"

const StakeMenu = ({ connected }) => {
  const [deposit, setDeposit] = React.useState(true);
  const [value, setValue] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);

  const filterValue = (event) => {
    const newValue = event.target.value;
    setValue(
      !!Number(newValue) ||
        newValue === "0." ||
        newValue === "" ||
        newValue === "0"
        ? newValue
        : value
    );
  };

  React.useEffect(() => {
    setDisabled(Number(value) <= 0);
  }, [value]);

  React.useEffect(() => {
    if (connected.value) {
      checkBalance(window.confluxJS.provider, window.conflux.selectedAddress)
    }
  }, [connected.value])

  // const buttonClick = await sendTransaction(window.conflux, value, deposit);

  return (
    <div className="StakeMenu">
      <div className="StakeMenu-Input-Container">
        <div className="StakeMenu-Input-Label">Amount</div>
        <div className="StakeMenu-Input">
          <input
            className="StakeMenu-Input-Input"
            placeholder="0.0"
            value={value}
            onChange={filterValue}
          />
          <div className="StakeMenu-Input-Token">
            <img src={logo} className="StakeMenu-Logo" alt="cfx_logo" />
            CFX
          </div>
        </div>
      </div>
      <div className="StakeMenu-Current">Current Staked: {0.0}</div>
      <div className="StakeMenu-Button-Container">
        <button
          className={`StakeMenu-Button Left ${deposit ? "Active" : "Disabled"}`}
          onClick={() => setDeposit(!deposit)}
        >
          Deposit
        </button>
        <button
          className={`StakeMenu-Button Right ${
            deposit ? "Disabled" : "Active"
          }`}
          onClick={() => setDeposit(!deposit)}
        >
          Withdraw
        </button>
      </div>
      <button
        className="StakeMenu-Send"
        disabled={!(!disabled && connected.value)}
      >
        Send Transaction
      </button>
    </div>
  );
}

export default StakeMenu;
