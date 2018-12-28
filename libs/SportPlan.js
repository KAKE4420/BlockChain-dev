import web3 from './web3';
import SportPlan from '../compiled/SportPlan.json';

const getContract = address => new web3.eth.Contract(JSON.parse(SportPlan.interface), address);

export default getContract;