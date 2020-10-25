import React from "react";
import "./alert.css";

const Alert = ({ chainID, tx }) => {
  const [active, setActive] = React.useState({ warn: false, tx: false });

  React.useEffect(() => {
    setActive({ warn: Number(chainID) === 2, tx: false });
  }, [chainID]);

  React.useEffect(() => {
    setActive({ warn: false, tx: !!tx });

    setTimeout(() =>
      setActive((prev) => {
        return {...prev, tx: false }
      }), 10000);
  }, [tx]);

  return (
    <div className="Alert-Container">
      {active.warn && (
        <div className="Alert-Alert Warning">
          Note: Staking balance is unavailable on Oceanus
        </div>
      )}
      {active.tx && (
        <div className="Alert-Alert Success">
          <a
            href={`https://${
              Number(window.conflux.networkVersion) === 1 ? "testnet." : ""
            }confluxscan.io/transactionsdetail/${tx}`}
          >
            View transaction on Confluxscan
          </a>
        </div>
      )}
    </div>
  );
};

export default Alert;
