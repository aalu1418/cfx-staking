import React from "react";
import "./stakeMenu.css";
import logo from "../assets/cfx_logo.svg";

function StakeMenu() {
  const [deposit, setDeposit] = React.useState(true);

  return (
    <div className="StakeMenu">
      <div className="StakeMenu-Input-Container">
        <div className="StakeMenu-Input-Label">Amount</div>
        <div className="StakeMenu-Input">
          <input className="StakeMenu-Input-Input" placeholder="0.0" />
          <div className="StakeMenu-Input-Token">
            <img src={logo} className="StakeMenu-Logo" alt="cfx_logo" />
            CFX
          </div>
        </div>
      </div>
      <div className="StakeMenu-Current">Current Staked: {0.00}</div>
      <div className="StakeMenu-Button-Container">
        <button
          className={`StakeMenu-Button Left ${deposit ? "Active" : "Disabled"}`}
          onClick={() => setDeposit(!deposit)}
        >
          Deposit
        </button>
        <button
          className={`StakeMenu-Button Right ${deposit ? "Disabled" : "Active"}`}
          onClick={() => setDeposit(!deposit)}
        >
          Withdraw
        </button>
      </div>
      <button className="StakeMenu-Send" disabled={false}>Send Transaction</button>
    </div>
  );
}

export default StakeMenu;
