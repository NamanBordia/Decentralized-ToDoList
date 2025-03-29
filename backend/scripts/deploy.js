// Import Hardhat runtime environment
const hre = require("hardhat");

async function main() {
    // Compile and fetch the contract
    const TodoList = await hre.ethers.getContractFactory("TodoList");

    // Deploy the contract
    const todoList = await TodoList.deploy();

    // Wait for deployment to complete
    await todoList.deployed();

    console.log("TodoList deployed to:", todoList.address);
}

// Handle errors and run the script
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
