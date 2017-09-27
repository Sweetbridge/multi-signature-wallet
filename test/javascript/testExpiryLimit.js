const MultiSigWalletWithDailyLimit = artifacts.require('MultiSigWalletWithDailyLimit')

const utils = require('./utils')
const ONE_DAY = 24 * 3600

contract('ExpiringMultiSigWalletWithDailyLimit', (accounts) => {
  let msw // multi sig wallet
  const dailyLimit = 3e22
  const requiredConfirmations = 2
  const expiryDelay = 60

  const deployMultisig = (owners, confirmations, limit) => {
    // set a 5 second delay before a transaction expires
    return MultiSigWalletWithDailyLimit.new(owners, confirmations, limit, expiryDelay)
  }

  before(async () => {
    msw = await deployMultisig([accounts[0], accounts[1]], requiredConfirmations, dailyLimit)
    assert.ok(msw)
  })

  it('has an expiry time of 5 seconds and a daily limit of 3\'000 ETH', async () => {
    assert.equal(expiryDelay, (await msw.expiryDelay()).toNumber())
    assert.equal(3e22, (await msw.dailyLimit()).toNumber())
  })

  it('executes the daily limit transaction immediately', async () => {
    let tx = await web3.eth.sendTransaction({from: accounts[5], to: msw.address, value: 1e24})
    assert.equal(1e24, web3.eth.getBalance(msw.address))

    await msw.submitTransaction(accounts[5], 3e22, "", {from: accounts[1]})
    tx = await msw.transactions(0)
    assert.ok(tx[3], "transaction executed right away")
  })

  it('executes a transaction after all confirmatino have been received within the delay', async () => {
    await msw.submitTransaction(accounts[5], 3e22, "", {from: accounts[0]})
    const txNum = (await msw.transactionCount()).sub(1).toNumber()
    assert.equal(1, txNum)
    assert.ok(await msw.hasNotExpired(txNum))
    await msw.confirmTransaction(txNum, {from: accounts[1]})

    let tx = await msw.transactions(txNum)
    assert.ok(tx[3], "transaction executed right away")
  })

  it('fails to execute a transaction after all confirmatino have been received after the delay', async () => {
    await msw.submitTransaction(accounts[5], 3e22, "", {from: accounts[0]})
    const txNum = (await msw.transactionCount()).sub(1).toNumber()
    assert.ok(await msw.hasNotExpired(txNum))
    await utils.increaseTimestamp(web3, expiryDelay + 1)
    await msw.confirmTransaction(txNum, {from: accounts[1]})

    let tx = await msw.transactions(txNum)
    assert.notOk(tx[3], "transaction executed right away")

  })

})