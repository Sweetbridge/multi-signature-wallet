const MultisigWalletWithDailyLimit = artifacts.require('MultiSigWalletWithDailyLimit.sol')
const MultisigWallet = artifacts.require('MultiSigWallet.sol')
const MultisigWalletFactory = artifacts.require('MultiSigWalletWithDailyLimitFactory.sol')

module.exports = deployer => {
  deployer.deploy(MultisigWalletFactory, true)
/*
  deployer.deploy(MultisigWallet,
    ["0x0f21f6fb13310ac0e17205840a91da93119efbec", "0xe2f8a351678d4264df0522d3d61d83258ce83daf"], 2, false)
  deployer.deploy(MultisigWalletWithDailyLimit,
    ["0x0f21f6fb13310ac0e17205840a91da93119efbec", "0xe2f8a351678d4264df0522d3d61d83258ce83daf"],
    2, 3000, false)
*/
}
