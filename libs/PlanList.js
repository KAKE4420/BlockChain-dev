import web3 from './web3';
import PlanList from '../compiled/PlanList.json';
import address from '../address.json';

const contract = new web3.eth.Contract(JSON.parse(PlanList.interface), address);

export default contract;