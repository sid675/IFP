// Import Hardhat runtime environment
const hre = require("hardhat");

async function main() {
  // Get the contract factory for ProductRegistry
  const ProductRegistry = await hre.ethers.getContractFactory("ProductRegistry");

  console.log("Deploying ProductRegistry contract...");

  // Deploy the contract
  const productRegistry = await ProductRegistry.deploy();

  // Wait for the contract to be mined
  await productRegistry.deployed();

  console.log("ProductRegistry deployed to:", productRegistry.address);
}

// Catch any errors during deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });