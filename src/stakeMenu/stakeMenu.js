import React from "react";
import "./stakeMenu.css";
import logo from "../assets/cfx_logo.svg";
import { checkBalance, sendTransaction } from "../assets/blockchain";

const StakeMenu = ({ connected, setTx, chainID }) => {
  const [deposit, setDeposit] = React.useState(true);
  const [value, setValue] = React.useState("");
  const [balance, setBalance] = React.useState("0.0");
  const [disabled, setDisabled] = React.useState(true);
  const [refresh, triggerRefresh] = React.useState(false);

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
      checkBalance(window.conflux, window.conflux.selectedAddress).then((res) =>
        setBalance(String(res))
      );
    }
  }, [connected.value, refresh, chainID]);

  const buttonClick = async () => {
    setDisabled(true);
    const receipt = await sendTransaction(
      window.conflux,
      deposit ? "deposit" : "withdraw",
      value
    );
    setTx(receipt);
    setValue("")
    triggerRefresh(!refresh);
    setDisabled(false);
  };

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
      <div className="StakeMenu-Current">Currently Staked: {balance}</div>
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
        onClick={buttonClick}
      >
        Send Transaction
      </button>
    </div>
  );
};

export default StakeMenu;
