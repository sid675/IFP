// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductRegistry {
    // Struct to represent a product
    struct Product {
        uint256 id;
        string name;
        string description;
        string manufacturer;
        uint256 timestamp; // When the product was added
        address addedBy;   // Address of the entity adding the product
    }

    // Mapping to store products by ID
    mapping(uint256 => Product) private products;

    // Event to be emitted when a product is added
    event ProductAdded(
        uint256 id,
        string name,
        string description,
        string manufacturer,
        uint256 timestamp,
        address addedBy
    );

    // Modifier to ensure the product ID is unique
    modifier uniqueProductId(uint256 id) {
        require(products[id].timestamp == 0, "Product ID already exists.");
        _;
    }

    // Function to add a product
    function addProduct(
        uint256 id,
        string memory name,
        string memory description,
        string memory manufacturer
    ) public uniqueProductId(id) {
        products[id] = Product({
            id: id,
            name: name,
            description: description,
            manufacturer: manufacturer,
            timestamp: block.timestamp,
            addedBy: msg.sender
        });

        emit ProductAdded(
            id,
            name,
            description,
            manufacturer,
            block.timestamp,
            msg.sender
        );
    }

    // Function to get product details by ID
    function getProduct(uint256 id)
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            string memory,
            uint256,
            address
        )
    {
        require(products[id].timestamp != 0, "Product not found.");

        Product memory product = products[id];
        return (
            product.id,
            product.name,
            product.description,
            product.manufacturer,
            product.timestamp,
            product.addedBy
        );
    }

    // Function to verify if a product exists
    function verifyProduct(uint256 id) public view returns (bool) {
        return products[id].timestamp != 0;
    }
}