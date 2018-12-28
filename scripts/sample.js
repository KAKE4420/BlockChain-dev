const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const PlanList = require('../compiled/PlanList.json');
const address = require('../address.json');

const web3 = new Web3(new HDWalletProvider(
    'torch ribbon split myth series tool visit toy initial summer pluck cargo',
    'https://rinkeby.infura.io/v3/f7fd564449c24e538d8c4b20942756cb'
));
const contract = new web3.eth.Contract(JSON.parse(PlanList.interface), address);

(async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);

    const projects = [
        {
            sportName: 'SPORT B',
            cost: 14,
            award: 12,
            sDate: 20171212,
            eDate: 20180122,
        },
    ];
    console.log(projects);

    const owner = accounts[0];
    const results = await Promise.all(projects.map(x =>
        contract
            .methods.createPlan(x.sportName,x.cost,x.award,x.sDate,x.eDate)
            .send({ from: owner, gas: '1000000' })
    )
    );

    console.log(results);
})();