import { ethers, defender } from "hardhat";

async function main() {
  const Token = await ethers.getContractFactory("NonUpgradableToken");

  const deployment = await defender.deployContract(Token);
  await deployment.waitForDeployment();
  console.log(`Contract deployed to: ${await deployment.getAddress()}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
