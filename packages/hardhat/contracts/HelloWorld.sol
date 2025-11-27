//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

/**
 * A simple "Hello World" smart contract for learning Shardeum development
 * This contract allows anyone to set and read a greeting message
 * @author Scaffold-Shard
 */
contract HelloWorld {
    // State Variables
    address public immutable owner;
    string public greeting = "Hello, Shardeum!";
    uint256 public totalGreetings = 0;
    
    // Mapping to track how many times each address has set a greeting
    mapping(address => uint256) public userGreetingCount;

    // Events: a way to emit log statements that can be listened to by external parties
    event GreetingChanged(
        address indexed user,
        string newGreeting,
        uint256 timestamp
    );

    // Constructor: Called once on contract deployment
    constructor(address _owner) {
        owner = _owner;
        console.log("HelloWorld contract deployed by:", _owner);
    }

    /**
     * Function that allows anyone to change the greeting message
     * @param _newGreeting - The new greeting message to set
     */
    function setGreeting(string memory _newGreeting) public {
        // Print to console for debugging
        console.log(
            "Setting new greeting '%s' from %s",
            _newGreeting,
            msg.sender
        );

        // Update state variables
        greeting = _newGreeting;
        totalGreetings += 1;
        userGreetingCount[msg.sender] += 1;

        // Emit event
        emit GreetingChanged(msg.sender, _newGreeting, block.timestamp);
    }

    /**
     * Function to read the current greeting
     * @return The current greeting message
     */
    function getGreeting() public view returns (string memory) {
        return greeting;
    }

    /**
     * Function to get the total number of greetings set
     * @return The total count of greetings
     */
    function getTotalGreetings() public view returns (uint256) {
        return totalGreetings;
    }

    /**
     * Function to get how many times a specific address has set a greeting
     * @param _user - The address to check
     * @return The number of times the address has set a greeting
     */
    function getUserGreetingCount(address _user) public view returns (uint256) {
        return userGreetingCount[_user];
    }
}
