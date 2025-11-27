import { expect } from "chai";
import { ethers } from "hardhat";
import { HelloWorld } from "../typechain-types";

describe("HelloWorld", function () {
    let helloWorld: HelloWorld;

    before(async () => {
        const [owner] = await ethers.getSigners();
        const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
        helloWorld = (await helloWorldFactory.deploy(owner.address)) as HelloWorld;
        await helloWorld.waitForDeployment();
    });

    describe("Deployment", function () {
        it("Should have the right initial greeting", async function () {
            expect(await helloWorld.greeting()).to.equal("Hello, Shardeum!");
        });

        it("Should set the right owner", async function () {
            const [owner] = await ethers.getSigners();
            expect(await helloWorld.owner()).to.equal(owner.address);
        });

        it("Should start with zero total greetings", async function () {
            expect(await helloWorld.totalGreetings()).to.equal(0);
        });
    });

    describe("setGreeting", function () {
        it("Should change the greeting", async function () {
            const newGreeting = "Welcome to Scaffold-Shard! :)";

            await helloWorld.setGreeting(newGreeting);
            expect(await helloWorld.greeting()).to.equal(newGreeting);
        });

        it("Should increment total greetings counter", async function () {
            const initialCount = await helloWorld.totalGreetings();
            await helloWorld.setGreeting("Another greeting");
            expect(await helloWorld.totalGreetings()).to.equal(initialCount + BigInt(1));
        });

        it("Should track user greeting count", async function () {
            const [owner] = await ethers.getSigners();
            const initialUserCount = await helloWorld.userGreetingCount(owner.address);

            await helloWorld.setGreeting("User greeting test");

            expect(await helloWorld.userGreetingCount(owner.address)).to.equal(initialUserCount + BigInt(1));
        });

        it("Should emit GreetingChanged event", async function () {
            const newGreeting = "Event test greeting";

            await expect(helloWorld.setGreeting(newGreeting))
                .to.emit(helloWorld, "GreetingChanged")
                .withArgs(
                    (await ethers.getSigners())[0].address,
                    newGreeting,
                    await ethers.provider.getBlock("latest").then(b => b!.timestamp + 1)
                );
        });
    });

    describe("Getter functions", function () {
        it("Should return the current greeting via getGreeting()", async function () {
            const currentGreeting = await helloWorld.greeting();
            expect(await helloWorld.getGreeting()).to.equal(currentGreeting);
        });

        it("Should return the total greetings via getTotalGreetings()", async function () {
            const totalGreetings = await helloWorld.totalGreetings();
            expect(await helloWorld.getTotalGreetings()).to.equal(totalGreetings);
        });

        it("Should return user greeting count via getUserGreetingCount()", async function () {
            const [owner] = await ethers.getSigners();
            const userCount = await helloWorld.userGreetingCount(owner.address);
            expect(await helloWorld.getUserGreetingCount(owner.address)).to.equal(userCount);
        });
    });
});
