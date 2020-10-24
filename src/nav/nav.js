import React from "react";
import "./nav.css";

function Nav({ connected }) {
  const [installed, setInstalled] = React.useState(false);
  const [address, setAddress] = React.useState("");

  React.useEffect(() => {
    if (!!window.conflux) {
      setInstalled(true);
    }
  }, []);

  const handleClick = async () => {
    if (!installed) {
      window.open("https://portal.conflux-chain.org/");
    } else {
      try {
        const account = await window.conflux.enable();
        setAddress(account[0]);
        connected.set(true);
      } catch (e) {
        console.log("Portal connection denied by user");
      }
    }
  };

  return (
    <div className="Nav">
      <button className="Nav-Button" onClick={handleClick}>
        <span
          className={`${installed ? "Nav-Button-Dot" : ""} ${
            !address ? "Red" : ""
          }`}
        />
        <div className="Nav-Button-Text">
          {connected.value
            ? address
            : installed
            ? "Connect Portal"
            : "Install Portal"}
        </div>
      </button>
    </div>
  );
}

export default Nav;
