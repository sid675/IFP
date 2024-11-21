// Import dependencies
const { ethers } = require("ethers");
const abi = require("./abi.json"); // ABI of the deployed contract
const config = require("./config.js"); // Config file with network and contract details

// Load configuration
const { providerUrl, privateKey, contractAddress } = config;

// Connect to Ethereum provider
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

// Set up wallet and contract
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Function to add a product
async function addProduct(id, name, description, manufacturer) {
  try {
    const tx = await contract.addProduct(id, name, description, manufacturer);
    console.log("Transaction sent. Waiting for confirmation...");
    const receipt = await tx.wait();
    console.log("Product added successfully:", receipt);
  } catch (error) {
    console.error("Error adding product:", error);
  }
}

// Function to retrieve a product
async function getProduct(id) {
  try {
    const product = await contract.getProduct(id);
    console.log("Product details:", {
      id: product[0].toString(),
      name: product[1],
      description: product[2],
      manufacturer: product[3],
      timestamp: new Date(product[4].toNumber() * 1000),
      addedBy: product[5],
    });
  } catch (error) {
    console.error("Error retrieving product:", error);
  }
}

// Function to verify if a product exists
async function verifyProduct(id) {
  try {
    const exists = await contract.verifyProduct(id);
    console.log(`Product ID ${id} exists:`, exists);
  } catch (error) {
    console.error("Error verifying product:", error);
  }
}

// Example usage
async function main() {
  const productId = 1;
  const productName = "Sample Product";
  const productDescription = "This is a test product";
  const productManufacturer = "Test Manufacturer";

  console.log("Adding a new product...");
  await addProduct(productId, productName, productDescription, productManufacturer);

  console.log("\nRetrieving the product...");
  await getProduct(productId);

  console.log("\nVerifying the product...");
  await verifyProduct(productId);
}

// Run the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });