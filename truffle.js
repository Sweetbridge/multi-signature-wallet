
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 9545,
      solc: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      },
      network_id: 12
    },
    rinkeby: {
      host: '34.213.220.128',
      port: 10001,
      network_id: '4',
      before_timeout: 200000,
      test_timeout: 300000
    },
    'backstage-parity': {
      gas: 5500000,
      host: '54.218.98.244',
      port: 10001,
      network_id: '17'
    },
    backstage: {
      host: '54.148.24.3',
      port: 10001,
      network_id: '200',
      before_timeout: 200000,
      test_timeout: 300000
    },
    ropsten: {
      host: 'localhost',
      gas: 4700000,
      gasPrice: 10000000000,
      port: 8545,
      network_id: '1',
      from: '0x1B10dc8E54007AC01FD522745E03073eF2f10B22',
      before_timeout: 200000,
      test_timeout: 300000
    },
    main: {
      host: 'localhost',
      port: 8545,
      network_id: '1',
      from: '0x1B10dc8E54007AC01FD522745E03073eF2f10B22',
      before_timeout: 200000,
      test_timeout: 300000
    }
  }
};
