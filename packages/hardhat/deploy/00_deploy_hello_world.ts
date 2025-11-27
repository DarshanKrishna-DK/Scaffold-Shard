import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys the "HelloWorld" contract using the deployer account
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployHelloWorld: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to Shardeum Sphinx testnet (e.g `yarn deploy --network shardeumSphinx`), 
    the deployer account should have sufficient SHM balance to pay for the gas fees for contract creation.
    
    Get free SHM tokens from the Shardeum Sphinx Faucet: https://faucet.sphinx.shardeum.org/

    You can generate a random account with `yarn generate` or `yarn account:import` to import your
    existing private key which will fill DEPLOYER_PRIVATE_KEY_ENCRYPTED in the .env file 
    (then used in hardhat.config.ts)
    
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("HelloWorld", {
    from: deployer,
    // Contract constructor arguments
    args: [deployer],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const helloWorld = await hre.ethers.getContract<Contract>("HelloWorld", deployer);
  console.log("👋 Initial greeting:", await helloWorld.greeting());
  console.log("📊 Total greetings:", await helloWorld.totalGreetings());
};

export default deployHelloWorld;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags HelloWorld
deployHelloWorld.tags = ["HelloWorld"];
