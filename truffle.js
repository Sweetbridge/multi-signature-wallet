
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8544,
      network_id: 12 // Match any network id
    },
    rinkeby: {
      host: '34.213.220.128',
      port: 10001,
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
