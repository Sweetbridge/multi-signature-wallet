var MultiSigWallet = artifacts.require('MultiSigWallet')
var {wallets} = require('./wallets.json')
var fs = require('fs')

module.exports = function (callback) {
  let args = process.argv
  let net = args.find(arg => arg.startsWith('--network'))
  if(args.indexOf('--network') !== -1) {
    net = args[args.indexOf('--network') + 1]
  } else if (net) {
    net = net.substring(10)
  }

  let constructors = []
  let ms = {
    networkId: web3.version.network,
    network: net || 'development'
  }
  wallets.forEach(wallet => {
    constructors.push(MultiSigWallet.new(wallet.owners, wallet.signatures, 3600 * 24 * 15)
      .then(w => {
        return {name: wallet.name, wallet: w}
      }))
  })
  Promise.all(constructors)
    .then(res => {
      res.forEach(r => {
        let tx = web3.eth.getTransactionReceipt(r.wallet.transactionHash)
        ms[r.name] = {
          contractAddress: r.wallet.address
        }
      })
      fs.writeFileSync('wallet-contracts.json', JSON.stringify(ms))
      callback()
    })
}
