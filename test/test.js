const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Decentralearn", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Contract = await ethers.getContractFactory("Decentralearn");
    const contract = await Contract.deploy("Hello, world!");
    await contract.deployed();

    expect(await contract.greet()).to.equal("Hello, world!");

    const setGreetingTx = await contract.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await contract.greet()).to.equal("Hola, mundo!");
  });
});
