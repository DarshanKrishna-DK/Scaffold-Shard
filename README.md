# 🏗 Scaffold-Shard

<div align="center">

**Build Your First dApp on Shardeum!**

A beginner-friendly boilerplate for building decentralized applications on the **Shardeum Mezame Testnet**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Shardeum](https://img.shields.io/badge/Shardeum-Mezame-purple)](https://shardeum.org)

[🌐 Shardeum](https://shardeum.org) | [📚 Docs](https://docs.shardeum.org) | [💧 Faucet](https://faucet-mezame.shardeum.org/) | [🔍 Explorer](https://explorer-mezame.shardeum.org/)

</div>

---

## 🌟 What is Scaffold-Shard?

**Scaffold-Shard** is a ready-to-use development stack for building decentralized applications (dApps) on **Shardeum**, an EVM-compatible blockchain with:

- ⚡ **Low gas fees** that stay low forever
- 📈 **Linear scalability** through dynamic state sharding  
- 🔒 **True decentralization** and solid security
- 🚀 **Fast finality** for quick transactions

Perfect for **workshops, hackathons, and learning** how to build on Shardeum!

---

## ✨ What's Included?

- ✅ **Simple HelloWorld Contract** - A beginner-friendly smart contract to get started
- ✅ **Pre-configured for Shardeum** - Ready to deploy to Mezame Testnet
- ✅ **Modern Frontend** - Built with Next.js, React, and TailwindCSS
- ✅ **Wallet Integration** - RainbowKit for easy wallet connections
- ✅ **Contract Hot Reload** - Frontend auto-updates when you edit contracts
- ✅ **TypeScript** - Full type safety across the stack
- ✅ **Testing Framework** - Write and run tests for your contracts

---

## 📋 Prerequisites

Before you begin, make sure you have:

- **Node.js** (v20.18.3 or higher) - [Download](https://nodejs.org/)
- **Yarn** or **npm** - Package manager
- **Git** - [Download](https://git-scm.com/)
- **MetaMask** (or any Web3 wallet) - [Install](https://metamask.io/)

---

## 🚀 Quick Start (5 Minutes!)

### Step 1: Clone the Repository

```bash
git clone https://github.com/DarshanKrishna-DK/Scaffold-Shard.git
cd scaffold-shard
```

### Step 2: Install Dependencies

```bash
yarn install
# or
npm install
```

This will install all necessary packages. It might take a few minutes.

### Step 3: Add Shardeum Mezame Network to MetaMask

1. Open MetaMask
2. Click the network dropdown (top center)
3. Click "Add Network" → "Add a network manually"
4. Enter these details:

| Field | Value |
|-------|-------|
| **Network Name** | Shardeum Mezame |
| **RPC URL** | `https://api-mezame.shardeum.org/` |
| **Chain ID** | `8119` |
| **Currency Symbol** | `SHM` |
| **Block Explorer** | `https://explorer-mezame.shardeum.org/` |

5. Click "Save"

### Step 4: Get Test SHM Tokens

1. Visit the **Shardeum Mezame Faucet**: [https://faucet-mezame.shardeum.org/](https://faucet-mezame.shardeum.org/)
2. Connect your wallet or paste your address
3. Click "Request" to get free test SHM tokens
4. Wait for the transaction to complete (~10 seconds)

> 💡 **Tip**: You need SHM tokens to deploy contracts and pay for gas fees!

### Step 5: Set Up Your Deployer Account

Generate a new account for deploying contracts:

```bash
yarn generate
```

This creates a new wallet and saves it securely. **Make sure to save the private key shown!**

> ⚠️ **Important**: Send some SHM from your MetaMask to this deployer address (shown in the terminal).

Alternatively, import your existing private key:

```bash
yarn account:import
```

### Step 6: Deploy Your Contract

Deploy the HelloWorld contract to Shardeum Mezame:

```bash
yarn deploy --network shardeumSphinx
```

You should see output like:

```
✅ HelloWorld deployed at: 0x...
👋 Initial greeting: Hello, Shardeum!
```

### Step 7: Start the Frontend

```bash
yarn start
```

Open your browser and visit: **http://localhost:3000**

🎉 **Congratulations!** Your dApp is now running on Shardeum!

---

## 🎓 Understanding the Project

### Project Structure

```
scaffold-shard/
├── packages/
│   ├── hardhat/              # Smart contract development
│   │   ├── contracts/        # Your smart contracts
│   │   │   └── HelloWorld.sol
│   │   ├── deploy/           # Deployment scripts
│   │   ├── test/             # Contract tests
│   │   └── hardhat.config.ts # Hardhat configuration
│   │
│   └── nextjs/               # Frontend application
│       ├── app/              # Next.js pages
│       ├── components/       # React components
│       ├── hooks/            # Custom React hooks
│       └── scaffold.config.ts # Frontend configuration
│
├── README.md                 # This file!
└── package.json              # Project dependencies
```

### The HelloWorld Contract

Located at `packages/hardhat/contracts/HelloWorld.sol`, this simple contract:

- Stores a greeting message
- Allows anyone to change the greeting
- Tracks how many greetings have been set
- Emits events when the greeting changes

**Key Functions:**
- `setGreeting(string)` - Change the greeting message
- `getGreeting()` - Read the current greeting
- `getTotalGreetings()` - Get total number of greetings set

---

## 🛠 Available Commands

### Development Commands

```bash
# Install dependencies
yarn install

# Compile smart contracts
yarn compile

# Run contract tests
yarn hardhat:test

# Start frontend development server
yarn start
```

### Deployment Commands

```bash
# Deploy to Shardeum Mezame Testnet
yarn deploy --network shardeumSphinx

# Verify contract on Shardeum Explorer
yarn verify --network shardeumSphinx
```

### Account Management

```bash
# Generate new deployer account
yarn generate

# Import existing private key
yarn account:import

# Check account balance
yarn account
```

---

## 🧪 Testing Your Setup

Want to verify everything is working correctly? Check out our comprehensive testing guide:

📘 **[Complete Testing Guide](TEST.md)** - Step-by-step instructions to test your entire setup

Quick test to verify contracts work:

```bash
yarn hardhat:test
```

You should see all tests passing:

```
  HelloWorld
    Deployment
      ✓ Should have the right initial greeting
      ✓ Should set the right owner
      ✓ Should start with zero total greetings
    setGreeting
      ✓ Should change the greeting
      ✓ Should increment total greetings counter
      ✓ Should track user greeting count
      ✓ Should emit GreetingChanged event
```

For a complete testing walkthrough including deployment, frontend interaction, and more, see **[TEST.md](TEST.md)**.

---

## 🎨 Interacting with Your dApp

### Using the Frontend

1. **Connect Your Wallet**
   - Click "Connect Wallet" in the top right
   - Select MetaMask (or your preferred wallet)
   - Make sure you're on Shardeum Mezame network

2. **Debug Contracts Page**
   - Navigate to "Debug Contracts" in the menu
   - See all deployed contracts
   - Read contract state
   - Call contract functions

3. **Set a New Greeting**
   - Find the `setGreeting` function
   - Enter a new greeting message
   - Click "Send" and confirm in MetaMask
   - Watch the greeting update in real-time!

### Using Hardhat Console

```bash
yarn hardhat console --network shardeumSphinx
```

Then interact with your contract:

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld");
const helloWorld = await HelloWorld.attach("YOUR_CONTRACT_ADDRESS");
await helloWorld.getGreeting();
await helloWorld.setGreeting("Hello from console!");
```

---

## 📚 Learn More

### Shardeum Resources

- **Official Website**: [https://shardeum.org](https://shardeum.org)
- **Documentation**: [https://docs.shardeum.org](https://docs.shardeum.org)
- **Discord Community**: [https://discord.gg/shardeum](https://discord.gg/shardeum)
- **Twitter**: [@shardeum](https://twitter.com/shardeum)

### Shardeum Mezame Testnet

| Parameter | Value |
|-----------|-------|
| Network Name | Shardeum Mezame |
| Chain ID | 8119 |
| RPC URL | https://api-mezame.shardeum.org/ |
| Currency | SHM |
| Faucet | https://faucet-mezame.shardeum.org/ |
| Explorer | https://explorer-mezame.shardeum.org/ |

### Development Resources

- **Hardhat Docs**: [https://hardhat.org/docs](https://hardhat.org/docs)
- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Solidity Docs**: [https://docs.soliditylang.org](https://docs.soliditylang.org)
- **Ethers.js Docs**: [https://docs.ethers.org](https://docs.ethers.org)

---

## 🔧 Customizing Your dApp

### Adding a New Contract

1. Create a new `.sol` file in `packages/hardhat/contracts/`
2. Write your contract
3. Create a deployment script in `packages/hardhat/deploy/`
4. Deploy: `yarn deploy --network shardeumSphinx`

The frontend will automatically detect your new contract!

### Modifying the HelloWorld Contract

1. Edit `packages/hardhat/contracts/HelloWorld.sol`
2. Save the file
3. The frontend will auto-reload with your changes!

### Customizing the Frontend

- **Pages**: Edit files in `packages/nextjs/app/`
- **Components**: Modify files in `packages/nextjs/components/`
- **Styling**: Update TailwindCSS classes or edit `globals.css`

---

## 🐛 Troubleshooting

### Common Issues

**❌ "Insufficient funds" error**
- Make sure you have SHM tokens from the faucet
- Check your deployer account balance: `yarn account`

**❌ "Network not found" error**
- Verify Shardeum Mezame is added to MetaMask
- Check the Chain ID is exactly `8119`

**❌ "Contract not found" error**
- Make sure you deployed the contract first
- Check the deployment was successful
- Verify you're on the correct network

**❌ Frontend not updating**
- Try refreshing the page
- Clear browser cache
- Restart the development server: `yarn start`

### Getting Help

- **Discord**: Join [Shardeum Discord](https://discord.gg/shardeum) and ask in #dev-support
- **GitHub Issues**: Open an issue in this repository
- **Documentation**: Check [Shardeum Docs](https://docs.shardeum.org)

---

## 🤝 Contributing

We welcome contributions! Whether it's:

- 🐛 Reporting bugs
- 💡 Suggesting features
- 📝 Improving documentation
- 🔧 Submitting pull requests

Please feel free to open an issue or PR!

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ for the Shardeum community
- Based on Scaffold-Shard architecture
- Special thanks to all contributors and workshop participants!

---

## 🎯 Next Steps

Now that you have Scaffold-Shard running:

1. ✅ **Test your setup** - Follow the [Complete Testing Guide](TEST.md) to verify everything works
2. ✅ **Explore the HelloWorld contract** - Read the code and understand how it works
3. ✅ **Modify the greeting** - Try changing the default greeting
4. ✅ **Add new functions** - Extend the contract with your own features
5. ✅ **Create a new contract** - Build something unique!
6. ✅ **Share your project** - Show the community what you've built!

---

<div align="center">

**Happy Building on Shardeum! 🚀**

Made with 💜 by the Scaffold-Shard Team

[⭐ Star this repo](https://github.com/DarshanKrishna-DK/Scaffold-Shard) | [🐛 Report Bug](https://github.com/DarshanKrishna-DK/Scaffold-Shard/issues) | [💡 Request Feature](https://github.com/DarshanKrishna-DK/Scaffold-Shard/issues)

</div>
