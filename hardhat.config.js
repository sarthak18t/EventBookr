/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox")

const INFURA_API_KEY = "fd6d7c2c6a584c5bb300e1c3f8bb69e6";
const SEPOLIA_KEY = "343cd8d869cb4f001c623edbd16b6d7223f5780afdc2c9bdf571fa98c8f63abb"

module.exports = {
  networks : {
    sepolia : {
      url:`https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts :[SEPOLIA_KEY]
    }
  },
  solidity: "0.8.18",
};
