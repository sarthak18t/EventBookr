// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TicketMaster is ERC721{
    address public owner;
    uint public totalOccasions;
    uint public totalSupply;

    struct Occasion{
        uint id;
        string name;
        uint cost;
        uint tickets;
        uint maxTickets;
        string date;
        string time;
        string location;
    }

    constructor(string memory _name , string memory _symbol) ERC721(_name,_symbol){
        owner = msg.sender;
    }

    mapping(uint=>Occasion) public occasions;
    mapping(uint=>mapping(uint=>address))public seatOwner;
    mapping(uint=>mapping(address=>bool)) public hasBought;
    mapping(uint=>uint[]) public seatsTaken;

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    function list(
        string memory _name,
        uint256 _cost,
        uint256 _maxTickets,
        string memory _date,
        string memory _time,
        string memory _location
    ) public onlyOwner {
        totalOccasions++;
        occasions[totalOccasions] = Occasion(
            totalOccasions,
            _name,
            _cost,
            _maxTickets,
            _maxTickets,
            _date,
            _time,
            _location
        );
    }

    function mint(uint _id , uint _seat) public payable{
        require(_id>0,"id should be greater than zero");
        require(_id<=totalOccasions,"id should be less than totalOccasions");
        require(msg.value>=occasions[_id].cost,"ether must be greater than or equal to cost");

        require(seatOwner[_id][_seat]==address(0),"seat should be empty");
        require(_seat<occasions[_id].maxTickets,"seat number should be less than max seat");

        occasions[_id].tickets -= 1;
        seatOwner[_id][_seat] = msg.sender;
        hasBought[_id][msg.sender] = true;
        seatsTaken[_id].push(_seat);

        totalSupply++;
        _safeMint(msg.sender,totalSupply);

    }

    function getOccasion(uint _id) public view returns(Occasion memory){
        return occasions[_id];
    }

    function getSeatsTaken(uint _id) public view returns(uint[] memory){
        return seatsTaken[_id];
    }

    // function withdraw() public onlyOwner{
    //     (bool success, ) = owner.call{value: address(this).balance}("");
    //     require(success);
    // }
    function withdraw() public onlyOwner {
        require(address(this).balance > 0, "Contract balance is zero");
        payable(owner).transfer(address(this).balance);
    }
}
