const fs = require("fs-extra");
const path = require('path');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

//  get bytecode
const contractPath = path.resolve(
    __dirname, 
    '../compiled/PlanList.json');
const { interface, bytecode } = require(contractPath);

// 2. config provider
const provider = new HDWalletProvider(
    'torch ribbon split myth series tool visit toy initial summer pluck cargo',
    'https://rinkeby.infura.io/v3/f7fd564449c24e538d8c4b20942756cb'
);

// 3. get web3 instance
const web3 = new Web3(provider);

(async () => {
    // 4. get account
    const accounts = await web3.eth.getAccounts();
    console.log('部署合约账户：', accounts[0]);

    // 5. creat constract instance and deploy
    console.time('contract-deploy-time');
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode})
        .send({ from: accounts[0], gas: '4000000' });
    console.timeEnd('contract-deploy-time');
    const contractAddress = result.options.address;
    console.log('合约部署成功：', result.options.address);
    console.log(
        "合约查看地址:",
        `https://rinkeby.etherscan.io/address/${contractAddress}`
    );

    // 6. save constract address
    const addressFile = path.resolve(__dirname, "../address.json");
    fs.writeFileSync(addressFile, JSON.stringify(contractAddress));
    console.log("地址写入成功:", addressFile);
    process.exit();
})();