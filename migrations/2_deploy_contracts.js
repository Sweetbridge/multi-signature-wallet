const MultisigWalletFactory = artifacts.require('MultiSigWalletWithDailyLimitFactory.sol')

module.exports = deployer => {
  deployer.deploy(MultisigWalletFactory, true)
}
