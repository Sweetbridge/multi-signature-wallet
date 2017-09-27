
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: 12 // Match any network id
    },
    rinkeby: {
      host: 'localhost',
      port: 8547,
      network_id: '4',
      before_timeout: 200000,
      test_timeout: 300000
    },
    backstage: {
      host: '54.148.24.3',
      port: 10001,
      network_id: '200',
      before_timeout: 200000,
      test_timeout: 300000
    }
  }
};
