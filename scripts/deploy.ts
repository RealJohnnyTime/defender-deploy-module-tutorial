import { ethers, defender } from "hardhat";

async function main() {
  const Box = await ethers.getContractFactory("Box");

  const defaultApprovalProcess = await defender.getDefaultApprovalProcess();

  if (defaultApprovalProcess.address === undefined) {
    throw new Error(`Upgrade approval process with id ${defaultApprovalProcess.approvalProcessId} has no assigned address`);
  }

  const deployment = await defender.deployProxy(Box, [5, defaultApprovalProcess.address], {
    initializer: "initialize",
    redeployImplementation: "always"
  });

  await deployment.waitForDeployment();

  console.log(`Contract deployed to ${await deployment.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});