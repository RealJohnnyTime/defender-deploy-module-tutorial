import { ethers, defender } from "hardhat";

async function main() {
  const BoxV2 = await ethers.getContractFactory("BoxV2");

  const proposal = await defender.proposeUpgradeWithApproval(
    '0x9ed7A8d8E1a007E163C3A9Fa65C69d6E76eD0A0C',
    BoxV2,
    {redeployImplementation: "always"}
  )

  console.log(`Upgrade proposed with URL: ${proposal.url}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});