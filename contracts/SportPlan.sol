pragma solidity ^0.4.17;
contract PlanList {
    address[] public plans;

    function createPlan(string _sportName,uint _cost,uint _award,uint _sDate,uint _eDate) public {
        address newPlan = new SportPlan(
        msg.sender,
        _sportName,
        _cost,
        _award,
        _sDate,
        _eDate);
        plans.push(newPlan);
    }

    function getPlan() public view returns(address[]) {
        return plans;
    }
}
contract SportPlan{
    string public sportName;
    address public userID;
    address public sportPlanID;
    uint public cost;
    uint public award;
    uint public sDate;
    uint public eDate;
    bool public enable; //true working flase ending
    bool public status; //true on flase droped
    
    constructor(address _userID,string _sportName,uint _cost,uint _award,uint _sDate,uint _eDate) payable public{
        userID = _userID;
        sportPlanID = this;
        sportName = _sportName;
        cost = _cost;
        award = _award;
        sDate = _sDate;
        eDate = _eDate;
        enable = true;
        status = true;
    }
    
    function startPlan(string _sportName,uint _cost,uint _award,uint _sDate,uint _eDate) public payable {
        if(enable && status){
            sportName = _sportName;
            cost = _cost;
            award = _award;
            sDate = _sDate;
            eDate = _eDate;
        }
    }
    
    function finshPlan(uint _nDate) public{
        if(enable && status){
            if(_nDate > eDate){
                status = false;
            }else{
                enable = false;
            }
        }
    }
    
    function dropPlan() public{
        status = false;
        enable = false;
    }

    function getSummary() public view returns(string, uint, uint, uint, uint, bool, bool, address) {
        return(
            sportName,
            cost,
            award,
            sDate,
            eDate,
            enable,
            status,
            userID
        );
    } 
}