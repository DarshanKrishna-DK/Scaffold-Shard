# 🧪 Testing Guide for Scaffold-Shard

This guide will help you test your Scaffold-Shard setup step by step to ensure everything is working correctly.

---

## ⚠️ IMPORTANT: Known Issues & Fixes

Before starting, you need to fix these two issues:

### Issue 1: Frontend Import Errors

The codebase has incorrect import paths from the scaffold-eth to scaffold-shard migration.

**Fix (Using VS Code):**
1. Open VS Code
2. Press `Ctrl + Shift + H` (Find and Replace in Files)
3. Do these 3 replacements:

   **Replacement 1:**
   - Find: `from "~~/hooks/scaffold-shard`
   - Replace: `from "~~/hooks/scaffold-shard`
   - Click "Replace All"

   **Replacement 2:**
   - Find: `from "~~/components/scaffold-eth`
   - Replace: `from "~~/components/scaffold-shard`
   - Click "Replace All"

   **Replacement 3:**
   - Find: `from "~~/utils/scaffold-eth`
   - Replace: `from "~~/utils/scaffold-shard`
   - Click "Replace All"

This will fix all import errors!

### Issue 2: Shardeum Sphinx DNS Resolution Failing

The Shardeum Sphinx RPC (`sphinx.shardeum.org`) cannot be resolved. This could mean:
- The testnet might be deprecated or down
- DNS configuration issue on your system

**Two Options:**

**Option A: Test Locally (Recommended for Now)**
- Skip Shardeum deployment for now
- Test everything on your local Hardhat network
- See "Testing Locally" section below

**Option B: Fix DNS & Try Shardeum**
- Change DNS to Google DNS (8.8.8.8)
- See "DNS Troubleshooting" section below

---

## 🚀 Quick Start: Testing Locally

If you want to test the app right now without fixing DNS issues:

### Terminal 1: Start Local Blockchain
```bash
yarn chain
```
Leave this running!

### Terminal 2: Deploy & Start Frontend
```bash
# Deploy to local network
yarn deploy

# Start the frontend
yarn start
```

### Test in Browser
- Visit: http://localhost:3000
- Connect MetaMask to Localhost 8545
- Interact with your contract!

---

## Prerequisites Checklist

Before testing, make sure you have completed these steps:

- ✅ Node.js v20.18.3 or higher installed
- ✅ Yarn installed (via Corepack)
- ✅ Git installed
- ✅ MetaMask (or Web3 wallet) installed in your browser
- ✅ Project dependencies installed (`yarn install`)

### Install Yarn (If Not Already Installed)

If you don't have Yarn, run this command:

```bash
# Enable Corepack (comes with Node.js 16.10+)
corepack enable
```

This will automatically use the correct Yarn version specified in the project.

---

## Test 1: Verify Installation

### Purpose
Confirm all dependencies are properly installed.

### Steps
```bash
# Check Node.js version
node --version
# Should show: v20.18.3 or higher

# Check if Yarn is installed
yarn --version
# Should show: 3.2.3 or similar
```

### If Yarn Is Not Installed
If you get an error like "yarn is not recognized":

```bash
# Enable Corepack (comes with Node.js 16.10+)
corepack enable

# This will automatically install the correct Yarn version
```

Then try `yarn --version` again.

**Continue with verification:**
```bash
# Verify project structure
dir packages
# Should show: hardhat  nextjs
```

### Expected Result
✅ Node.js is installed (v20.18.3 or higher)  
✅ Yarn is installed and working  
✅ Folders `hardhat` and `nextjs` exist in `packages/`

---

## Test 2: Compile Smart Contracts

### Purpose
Ensure the HelloWorld contract compiles successfully.

### Steps
```bash
# Compile contracts
yarn compile
```

### Expected Result
✅ Output shows: "Compiled 2 Solidity files successfully"  
✅ Shows: "Successfully generated X typings!"  
✅ Creates artifacts in `packages/hardhat/artifacts/`

### Known Issue on Windows
You might see this error at the end:
```
Assertion failed: !(handle->flags & UV_HANDLE_CLOSING), file src\win\async.c, line 76
```

**This is harmless!** It's a known Windows + Node.js cleanup issue that happens AFTER successful compilation. Your contracts compiled correctly - you can safely ignore this error and continue.

### If It Fails
- Make sure you're in the project root directory
- Try `yarn hardhat:clean` then `yarn compile` again

---

## Test 3: Run Contract Tests

### Purpose
Verify the HelloWorld contract functions correctly through automated tests.

### Steps
```bash
# Run all contract tests
yarn hardhat:test
```

### Expected Result
✅ All tests pass (10 total):
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
    Getter functions
      ✓ Should return the current greeting via getGreeting()
      ✓ Should return the total greetings via getTotalGreetings()
      ✓ Should return user greeting count via getUserGreetingCount()

  10 passing
```

### If Tests Fail
- Check the error message carefully
- Make sure HelloWorld.sol hasn't been modified incorrectly
- Try `yarn compile` first, then run tests again

---

## Test 4: Generate Deployer Account

### Purpose
Create a secure account for deploying contracts to Shardeum.

### Steps
```bash
# Generate a new account
yarn generate
```

### Expected Result
✅ Shows a new wallet address like: `0x0d0fc89158B97C2f0B9185aE5C817196aaab12be`  
✅ Displays the deployer account details  
✅ **Important**: Save the private key if shown!  
✅ Account is saved in `packages/hardhat/.env`

### Example Output
```
👛 Deployer Account
Address: 0x0d0fc89158B97C2f0B9185aE5C817196aaab12be
```

**Note:** You might see "Can't connect to network shardeumSphinx" errors when checking balances - this is NORMAL and can be ignored. The Shardeum RPC might be slow or temporarily down. Your account is created successfully!

---

## Test 5: MetaMask Setup for Shardeum

### Purpose
Configure MetaMask to connect to Shardeum Sphinx Testnet.

### Steps

1. **Open MetaMask**
   - Click the network dropdown at the top center

2. **Add Network Manually**
   - Click "Add Network" → "Add a network manually"

3. **Enter Network Details**
   - **Network Name**: `Shardeum Sphinx`
   - **RPC URL**: `https://sphinx.shardeum.org/`
   - **Chain ID**: `80821`
   - **Currency Symbol**: `SHM`
   - **Block Explorer**: `https://explorer.sphinx.shardeum.org/`

4. **Save and Switch**
   - Click "Save"
   - Switch to "Shardeum Sphinx" network

### Expected Result
✅ "Shardeum Sphinx" appears in your network list  
✅ You can switch to it without errors  
✅ Balance shows 0 SHM (we'll fix this next)

---

## Test 6: Get Test Tokens from Faucet

### Purpose
Obtain free SHM tokens needed for deployment and transactions.

### Steps

1. **Visit the Faucet**
   - Go to: https://faucet.sphinx.shardeum.org/

2. **Connect Your Wallet OR Paste Address**
   - Either connect MetaMask directly
   - Or paste your MetaMask address

3. **Request Tokens**
   - Click "Request" or "Get SHM"
   - Wait for confirmation (usually 10-30 seconds)

4. **Verify Receipt**
   - Check MetaMask balance
   - Should now show SHM tokens (usually 100 SHM)

### Expected Result
✅ Transaction completes successfully  
✅ MetaMask shows SHM balance > 0  
✅ Can see transaction on https://explorer.sphinx.shardeum.org/

---

## Test 7: Fund Deployer Account

### Purpose
Send SHM to your deployer account so it can deploy contracts.

### Steps

1. **Get Your Deployer Address**
   ```bash
   yarn account
   ```
   - Copy the public address shown
   - **Note**: You'll likely see "Can't connect to network shardeumSphinx" - this is NORMAL

2. **Send SHM from MetaMask**
   - Open MetaMask
   - Click "Send"
   - Paste the deployer address
   - Send at least 10 SHM (recommended 50 SHM for multiple deployments)
   - Confirm the transaction
   - Wait for confirmation (~10-30 seconds)

3. **Verify Transfer on Explorer (Important!)**
   
   Since `yarn account` has RPC connection issues, use the blockchain explorer instead:
   
   - Go to: https://explorer-sphinx.shardeum.org/
   - Search for your deployer address
   - Or use direct link: `https://explorer-sphinx.shardeum.org/account/YOUR_ADDRESS`
   - Verify you see SHM balance > 0

### Expected Result
✅ Transaction confirmed in MetaMask  
✅ Transaction visible on Shardeum Explorer  
✅ Explorer shows your deployer address has SHM balance > 0

### Common Issue
Running `yarn account` will likely show:
- "Can't connect to network shardeumSphinx" ❌
- Balance: 0 (even if you have funds) ❌
- Windows assertion error ❌

**This is a known RPC connection issue - IGNORE IT!**

Your actual balance is on the blockchain. Always verify using the Explorer, not `yarn account`.

### Troubleshooting
- **`yarn account` shows 0 balance**: Use Explorer to verify instead
- **Transaction pending**: Wait 30 seconds, then check Explorer
- **Transaction failed**: Make sure you're on Shardeum Sphinx network in MetaMask
- **Can't find address on Explorer**: Wait a bit longer, refresh the page

---

## Test 8: Deploy Contract to Shardeum Sphinx

### Purpose
Deploy the HelloWorld contract to the live Shardeum testnet.

### Before You Deploy
Make sure your deployer has SHM! Verify on Explorer:
- Visit: `https://explorer-sphinx.shardeum.org/account/YOUR_DEPLOYER_ADDRESS`
- Should show balance > 0 SHM

### Steps
```bash
# Deploy to Shardeum Sphinx
yarn deploy --network shardeumSphinx
```

**Note**: You might see the Windows assertion error at the end - ignore it. Look for the success message first!

### Expected Result
✅ Deployment succeeds - shows success message:
```
Deploying HelloWorld contract...
✅ HelloWorld deployed at: 0xABCD...1234
👋 Initial greeting: Hello, Shardeum!
📊 Owner: 0x[your-deployer-address]
```

✅ Creates `packages/nextjs/contracts/deployedContracts.ts` with contract info  
✅ Then you'll see the Windows assertion error (ignore it)

**Save your contract address!** You'll need it later.

### If Deployment Fails

**"Insufficient funds for gas" error:**
- Your deployer has no SHM or not enough
- Verify balance on Explorer: https://explorer-sphinx.shardeum.org/
- Get more SHM from faucet and send to deployer
- Try deployment again

**"Network error" or timeout:**
- Shardeum RPC might be slow/busy
- Wait 30 seconds and try again
- Check internet connection
- Verify RPC is up: https://sphinx.shardeum.org/

**"Nonce too high" or "Nonce has already been used":**
- Wait 1-2 minutes
- Try deployment again
- If persists, generate new account: `yarn generate`

**Windows assertion error appears immediately (before deployment message):**
- This means deployment failed before starting
- Check your deployer has SHM balance on Explorer
- Make sure you're in the project root directory

---

## Test 9: Start Frontend

### Purpose
Launch the Next.js frontend application.

### Steps
```bash
# Start the development server
yarn start
```

### Expected Result
✅ Server starts successfully  
✅ Shows:
```
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000
```
✅ No compilation errors

### Keep This Running
Leave this terminal window open. The frontend will run continuously.

---

## Test 10: Access the dApp UI

### Purpose
Verify the frontend loads and displays correctly.

### Steps

1. **Open Browser**
   - Visit: http://localhost:3000

2. **Check Homepage**
   - Should see Scaffold-Shard branding
   - Navigation menu at top
   - Footer at bottom

3. **Connect Wallet**
   - Click "Connect Wallet" (top right)
   - Select MetaMask
   - **Make sure you're on Shardeum Sphinx network**
   - Approve connection

### Expected Result
✅ Page loads without errors  
✅ UI displays correctly  
✅ Wallet connects successfully  
✅ Shows your address in the header  
✅ Shows your SHM balance

---

## Test 11: Use Debug Contracts Page

### Purpose
Interact with your deployed contract through the UI.

### Steps

1. **Navigate to Debug Contracts**
   - Click "Debug Contracts" in the menu
   - Or visit: http://localhost:3000/debug

2. **Find HelloWorld Contract**
   - Should see "HelloWorld" contract listed
   - Shows contract address
   - Displays all functions

3. **Read Contract State**
   - Find the "Read" section
   - Click "greeting" (or getGreeting)
   - Should display: "Hello, Shardeum!"
   - Click "totalGreetings"
   - Should show: 0

### Expected Result
✅ Contract appears on the page  
✅ Can read current greeting  
✅ Total greetings shows 0  
✅ All read functions work without errors

---

## Test 12: Write to Contract (Set Greeting)

### Purpose
Send a transaction to change the greeting.

### Steps

1. **On Debug Contracts Page**
   - Find "setGreeting" function under "Write" section

2. **Enter New Greeting**
   - Type a new message: e.g., "Testing Scaffold-Shard!"
   - Click "Send" button

3. **Approve in MetaMask**
   - MetaMask popup appears
   - Review the transaction
   - Click "Confirm"

4. **Wait for Confirmation**
   - Should see success notification
   - Transaction processes (~5-10 seconds)

5. **Verify Change**
   - Read the greeting again
   - Should now show your new message
   - Total greetings should increment to 1

### Expected Result
✅ Transaction sends successfully  
✅ MetaMask confirms transaction  
✅ Success notification appears  
✅ Greeting updates to new value  
✅ Counter increments  
✅ Transaction visible on Shardeum Explorer

### Example
Before: "Hello, Shardeum!"  
After: "Testing Scaffold-Shard!"  
Total Greetings: 0 → 1

---

## Test 13: View Transaction on Explorer

### Purpose
Verify your transaction on the Shardeum blockchain explorer.

### Steps

1. **Get Transaction Hash**
   - After setting greeting, note the transaction hash
   - Or find it in the success notification

2. **Open Explorer**
   - Visit: https://explorer.sphinx.shardeum.org/
   - Paste your transaction hash in search bar
   - Or click the link from the notification

3. **Review Transaction Details**
   - Check transaction status: "Success"
   - View gas used
   - See contract interaction details

### Expected Result
✅ Transaction shows as "Success"  
✅ Shows correct "From" address (your wallet)  
✅ Shows "To" address (HelloWorld contract)  
✅ Displays gas fees paid

---

## Test 14: Multiple Users Test (Optional)

### Purpose
Test contract with multiple wallet addresses.

### Steps

1. **Create Second Account in MetaMask**
   - Create or import another account
   - Get SHM from faucet for this account

2. **Connect with New Account**
   - Disconnect current wallet
   - Connect the second account
   - Make sure it's on Shardeum Sphinx

3. **Set Greeting from New Account**
   - Go to Debug Contracts
   - Set a different greeting
   - Confirm transaction

4. **Check Counter**
   - Total greetings should now be 2
   - Each user's count should be tracked separately

### Expected Result
✅ Multiple accounts can interact with contract  
✅ Each transaction increments the counter  
✅ All users see the latest greeting

---

## Test 15: Block Explorer Page (Optional)

### Purpose
Test the built-in block explorer functionality.

### Steps

1. **Navigate to Block Explorer**
   - Click "Block Explorer" in menu
   - Or visit: http://localhost:3000/blockexplorer

2. **Search for Your Contract**
   - Paste your HelloWorld contract address
   - Click search

3. **View Contract Details**
   - Should see contract information
   - Transaction history
   - Contract interactions

### Expected Result
✅ Block explorer page loads  
✅ Can search for addresses  
✅ Displays contract information  
✅ Shows transaction history

---

## Test 16: Hot Reload Test (Optional)

### Purpose
Verify frontend auto-updates when contracts change.

### Steps

1. **Keep Frontend Running**
   - Make sure `yarn start` is still running

2. **Modify HelloWorld Contract**
   - Open `packages/hardhat/contracts/HelloWorld.sol`
   - Add a simple comment or modify greeting text
   - Save the file

3. **Watch Frontend**
   - Browser should automatically refresh
   - Should detect contract changes

### Expected Result
✅ Frontend detects file changes  
✅ Automatically recompiles  
✅ Browser refreshes automatically

---

## Common Issues & Solutions

### Issue: "`yarn account` shows 0 balance or can't connect"
**Solution:**
- This is a known RPC connection issue with Shardeum Sphinx
- Your funds are likely there - the command just can't fetch them
- **Always verify on Explorer**: https://explorer-sphinx.shardeum.org/
- Search for your deployer address
- If Explorer shows balance > 0, you're good to deploy!
- Ignore the `yarn account` output

### Issue: "DNS Resolution Failed - Can't reach sphinx.shardeum.org"
**Problem:** Your computer cannot resolve `sphinx.shardeum.org`

**Quick Fix - Change DNS to Google DNS:**

**Windows:**
1. Press `Win + R`, type `ncpa.cpl`, press Enter
2. Right-click your active network connection → Properties
3. Double-click "Internet Protocol Version 4 (TCP/IPv4)"
4. Select "Use the following DNS server addresses:"
   - Preferred: `8.8.8.8`
   - Alternate: `8.8.4.4`
5. Click OK → Close
6. Open PowerShell as Administrator:
   ```powershell
   ipconfig /flushdns
   ```
7. Test:
   ```powershell
   nslookup sphinx.shardeum.org
   ```

**If still not working after DNS change:**
- The Shardeum Sphinx testnet might be temporarily down or deprecated
- **Recommendation**: Test locally with `yarn chain` instead
- Check Shardeum Discord/Twitter for network status updates

### Issue: "Windows assertion failed error"
**Solution:**
- `Assertion failed: !(handle->flags & UV_HANDLE_CLOSING), file src\win\async.c, line 76`
- This is a harmless Windows + Node.js cleanup error
- Appears AFTER commands complete successfully
- Does NOT indicate failure - ignore it
- Look for success messages BEFORE this error appears

### Issue: "Cannot connect to network"
**Solution:**
- Check internet connection
- Verify Shardeum RPC: https://sphinx.shardeum.org/
- Try switching networks in MetaMask, then back to Sphinx
- Wait a few minutes - RPC might be temporarily busy

### Issue: "Contract not found"
**Solution:**
- Make sure you deployed: `yarn deploy --network shardeumSphinx`
- Check deployment was successful (look for contract address)
- Verify you're on Shardeum Sphinx network in MetaMask
- Check the contract address on Explorer

### Issue: "Insufficient funds for gas"
**Solution:**
- Your deployer needs more SHM
- Verify balance on Explorer (not `yarn account`)
- Get more SHM from faucet: https://faucet.sphinx.shardeum.org/
- Send to your deployer address
- Verify transfer on Explorer, then try again

### Issue: "Transaction failed"
**Solution:**
- Check deployer has enough SHM on Explorer
- Verify contract address is correct
- Check transaction on Explorer for detailed error message
- Try increasing gas limit if needed

### Issue: "Frontend not loading"
**Solution:**
- Make sure `yarn start` is running
- Try visiting http://localhost:3000 directly
- Clear browser cache (Ctrl+F5)
- Check terminal for error messages
- Try stopping (`Ctrl+C`) and restarting `yarn start`

### Issue: "MetaMask not connecting"
**Solution:**
- Refresh the page
- Make sure MetaMask is unlocked
- Try disconnecting and reconnecting
- Verify you're on Shardeum Sphinx network (Chain ID: 80821)
- Clear MetaMask cache: Settings → Advanced → Clear activity tab data

---

## Complete Test Checklist

Use this checklist to track your testing progress:

- [ ] Test 1: Installation verified
- [ ] Test 2: Contracts compile successfully (ignore Windows cleanup error)
- [ ] Test 3: All contract tests pass (10/10)
- [ ] Test 4: Deployer account generated (note your address)
- [ ] Test 5: MetaMask configured for Shardeum
- [ ] Test 6: Test tokens received from faucet
- [ ] Test 7: Deployer account funded (verify on Explorer)
- [ ] Test 8: Contract deployed to Sphinx (note contract address)
- [ ] Test 9: Frontend starts successfully
- [ ] Test 10: dApp UI loads and wallet connects
- [ ] Test 11: Can read contract data
- [ ] Test 12: Can write to contract
- [ ] Test 13: Transaction visible on Explorer
- [ ] Test 14: Multiple users work (optional)
- [ ] Test 15: Block explorer works (optional)
- [ ] Test 16: Hot reload works (optional)

---

## Success Criteria

Your Scaffold-Shard setup is fully working if:

✅ All contracts compile without errors (ignore Windows cleanup warning)  
✅ All tests pass (10/10)  
✅ Deployer account created  
✅ Contract deployed to Shardeum Sphinx  
✅ Frontend loads at http://localhost:3000  
✅ Wallet connects to dApp  
✅ Can read contract state  
✅ Can write to contract (set greeting)  
✅ Transactions confirm on Shardeum  
✅ Changes reflect in the UI  

---

## Next Steps After Testing

Once all tests pass:

1. **Explore the Code**
   - Read HelloWorld.sol to understand the contract
   - Check deployment script in `packages/hardhat/deploy/`
   - Review frontend components in `packages/nextjs/app/`

2. **Modify the Contract**
   - Add new functions to HelloWorld
   - Try adding state variables
   - Redeploy and test changes

3. **Create Your Own Contract**
   - Start a new .sol file
   - Write your custom logic
   - Deploy and interact through the UI

4. **Customize the Frontend**
   - Modify pages in `packages/nextjs/app/`
   - Add new components
   - Style with TailwindCSS

---

## Getting Help

If you encounter issues:

- **Documentation**: Check README.md for detailed setup instructions
- **Discord**: Join Shardeum Discord - https://discord.gg/shardeum
- **GitHub**: Open an issue with error details
- **Explorer**: Use https://explorer.sphinx.shardeum.org/ to debug transactions

---

**Happy Testing! 🧪**

Once all tests pass, you're ready to build amazing dApps on Shardeum! 🚀

