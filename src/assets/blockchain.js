const { Conflux } = require("js-conflux-sdk");
const util = require("js-conflux-sdk/src/util");
const abi = require("./abi.json");
const address = "0x0888000000000000000000000000000000000002";

const cfx = new Conflux();
const contract = cfx.Contract({
  abi,
  address,
});

export const checkBalance = async (provider, userAddress) => {
  const tx = contract.getStakingBalance(userAddress);
  try {
    const balance = await provider.send("cfx_call", [
      { to: contract.address, data: tx.data },
    ]);
    const drip = util.format.bigInt(balance);
    return util.unit.fromDripToCFX(drip);
  } catch (e) {
    console.log("checkBalance: ", e);
    return 0;
  }
};

export const sendTransaction = async (provider, type, amountCFX) => {
  const tx = contract[type](util.unit.fromCFXToDrip(amountCFX));
  console.log(tx);
  try {
    const receipt = await provider.send("cfx_sendTransaction", [
      {
        to: contract.address,
        data: tx.data,
        from: window.conflux.selectedAddress,
        gas: "21000"
      },
    ]);
    return receipt;
  } catch (e) {
    console.log("sendTransaction: ", e);
    return undefined;
  }
};
