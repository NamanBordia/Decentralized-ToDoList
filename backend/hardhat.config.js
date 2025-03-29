/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");


module.exports = {
  solidity: "0.8.0", // Use the correct Solidity version
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/VXrsduTm4N_WCnsM6QNlRJupkBUzDK9W',
      accounts: ['0x890b94e8a3d90f074109414872450c49b3dfa26a7e998d2a13ea6edb5eb66452'], // Private key must be a string
      chainId: 11155111,
    },
    localhost: {
      url: "http://127.0.0.1:8545", // Fixed missing quotation mark
    },
  },
};
//'https://eth-sepolia.g.alchemy.com/v2/VXrsduTm4N_WCnsM6QNlRJupkBUzDK9W',
//890b94e8a3d90f074109414872450c49b3dfa26a7e998d2a13ea6edb5eb66452