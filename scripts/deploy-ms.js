var MultiSigWallet = artifacts.require('MultiSigWallet')
var {wallets} = require('./wallets.json')
var fs = require('fs')

module.exports = function (callback) {
  let args = process.argv
  /*
  this script only works if the network is the last parameter passed to the script
  the network is given as parameter in the following format
  --network=network-name
  --network networkname
   */
  //get the parameter and the value in case of the first format
  let net = args.find(arg => arg.startsWith('--network'))
  //in case of the second format, the args array is extended
  if(args.indexOf('--network') !== -1) {
    net = args[args.indexOf('--network') + 1]
  } else if (net) { //the second format was used
    net = net.substring(10)
  }

  let constructors = []
  let output = {
    networkId: web3.version.network,
    network: net || 'development'
  }
  wallets.forEach(wallet => {
    constructors.push(MultiSigWallet.new(wallet.owners, wallet.signatures, 3600 * 24 * 15)
      .then(w => {
        return {name: wallet.name, wallet: w}
      })
      .catch(e => {
        return {name: wallet.name, wallet: {address: e.message}}
      })
    )
  })
  Promise.all(constructors)
    .then(res => {
      res.forEach(r => {
        output[r.name] = {
          contractAddress: r.wallet.address
        }
      })
      fs.writeFileSync('wallet-contracts.json', JSON.stringify(output))
      callback()
    })
}
