import React from "react";
import "./alert.css";

const Alert = ({ chainID, tx }) => {
  const [active, setActive] = React.useState({ warn: false, tx: false });

  React.useEffect(() => {
    setActive({ warn: Number(chainID) === 2, tx: false });
  }, [chainID]);

  React.useEffect(() => {
    setActive({ warn: false, tx: !!tx });

    setTimeout(
      () =>
        setActive((prev) => {
          return { ...prev, tx: false };
        }),
      10000
    );
  }, [tx]);

  const clear = () => {
    setActive({ warn: false, tx: false });
    console.log("here");
  };

  return (
    <div className="Alert-Container">
      {active.warn && (
        <div className="Alert-Alert Warning">
          <div>Staking balance is unavailable on Oceanus</div>
          <div class="close" onClick={clear}>
            &times;
          </div>
        </div>
      )}
      {active.tx && (
        <div className="Alert-Alert Success">
          <a
            href={`https://${
              Number(window.conflux.networkVersion) === 1 ? "testnet." : ""
            }confluxscan.io/transaction/${tx}`}
          >
            View transaction on Confluxscan
          </a>
          <div class="close" onClick={clear}>
            &times;
          </div>
        </div>
      )}
    </div>
  );
};

export default Alert;
