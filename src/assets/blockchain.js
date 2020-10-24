const { Conflux, Util } = require("js-conflux-sdk");
const abi = require("./abi.json");

export const checkBalance = async (provider, address) => {
  const cfx = new Conflux({ url: "http://main.confluxrpc.org" });
  // cfx.setProvider(window.conflux);
  const contract = cfx.Contract({
    abi,
    address: "0x0888000000000000000000000000000000000002",
  }); //
  // console.log(cfx.provider, window.conflux);
  const tx = await contract.getStakingBalance(address);
  console.log(tx);
  // console.log(tx.to, tx.data);
  // window.conflux.call("cfx_epochNumber", ["latest_state"]);
  // console.log(tx);
  // const balance = await window.conflux.call({to: tx.to, data:tx.data});
  // console.log(balance);
  const res = await window.conflux.send("cfx_call", [{to: tx.to, from: tx.from}]);
  console.log(res);
};
