/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
};
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: "https://eth-goerli.alchemyapi.io/v2/YOUR_ALCHEMY_API_KEY", // Replace with your provider URL
      accounts: ["YOUR_PRIVATE_KEY"], // Replace with your private key
    },
  },
};