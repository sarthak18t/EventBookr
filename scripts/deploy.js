const hre = require("hardhat");

const tokens= (n)=>{
  return hre.ethers.parseEther(n.toString());
}

async function main(){
  const [deployer] = await hre.ethers.getSigners();
  const TokenMaster = await hre.ethers.getContractFactory("TicketMaster");
  const tokenMaster = await TokenMaster.deploy("TokenMaster","TM");

  console.log(`Deployed TokenMaster Contract at: ${await tokenMaster.getAddress()}\n`)
  const occasions = [
    {
      name: "MLH Hackathon",
      cost: tokens(0.1),
      tickets: 0,
      date: "May 31",
      time: "6:00PM IST",
      location: "Vadodara,Gujarat"
    },
    {
      name: "ETH Tokyo",
      cost: tokens(1),
      tickets: 125,
      date: "Jul 2",
      time: "1:00PM IST",
      location: "Tokyo, Japan"
    },
    {
      name: "ETH Hackathon",
      cost: tokens(0.25),
      tickets: 200,
      date: "Jul 20",
      time: "10:00AM IST",
      location: "PARIS"
    },
    {
      name: "ASIA CUP IND vs PAK",
      cost: tokens(1),
      tickets: 0,
      date: "Aug 11",
      time: "2:30PM IST",
      location: "Mumbai, Maharastra"
    },
    {
      name: "World Table Tennis League",
      cost: tokens(0.5),
      tickets: 125,
      date: "Jul 23",
      time: "11:00AM IST",
      location: "Dubai, UAE"
    }
  ]

  for(let i = 0 ;i<5;i++){
    const transaction = await tokenMaster.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location,
    )
    console.log(`Listed event : ${occasions[i].name}`);
  }
}

main()
.catch((error)=>{
  console.log(error)
  process.exit(1)
})
