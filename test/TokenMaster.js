const {expect} = require("chai");
const { ethers } = require("hardhat");

const NAME = "TokenMaster";
const SYMBOL = "TM";

const OCCASION_NAME = "ETH global";
const OCCASION_COST = ethers.parseEther("1");
const OCCASION_MAX_TICKETS = 100;
const OCCASION_DATE = "JUL 5";
const OCCASION_TIME = "10:00AM IST";
const OCCASION_LOCATION = "GUJARAT,INDIA";

describe("TokenMaster",()=>{
    let tokenMaster;
    let deployer,buyer;
    beforeEach(async()=>{
        [deployer,buyer] = await ethers.getSigners();
        const TokenMaster = await ethers.getContractFactory("TicketMaster");
        tokenMaster = await TokenMaster.deploy(NAME,SYMBOL);

        const transaction = await tokenMaster.connect(deployer).list(
            OCCASION_NAME,
            OCCASION_COST,
            OCCASION_MAX_TICKETS,
            OCCASION_DATE,
            OCCASION_TIME,
            OCCASION_LOCATION
        )
    })
    describe("deployment",()=>{
        it("has a name",async()=>{
            expect(await tokenMaster.name()).to.equal(NAME);
        })
        it("has a symbol",async()=>{
            expect(await tokenMaster.symbol()).to.equal(SYMBOL);
        })
    })
    describe("occasions",()=>{
        it("returns occasion attributes",async ()=>{
            const occasion = await tokenMaster.getOccasion(1);
            expect(occasion.id).to.equal(1);
            expect(occasion.name).to.equal(OCCASION_NAME);
            expect(occasion.cost).to.equal(OCCASION_COST);
            expect(occasion.maxTickets).to.equal(OCCASION_MAX_TICKETS);
            expect(occasion.date).to.equal(OCCASION_DATE);
            expect(occasion.time).to.equal(OCCASION_TIME);
            expect(occasion.location).to.equal(OCCASION_LOCATION);
        })
    })
    describe("minting",()=>{
        const ID = 1;
        const SEAT = 50;
        const AMOUNT = ethers.parseEther("1")
        beforeEach(async ()=>{
            const transaction = await tokenMaster.connect(buyer).mint(ID,SEAT,{value:AMOUNT})
        })
        it("should update ticket count",async()=>{
            const ocassion = await tokenMaster.getOccasion(ID);
            expect(await ocassion.tickets).to.equal(OCCASION_MAX_TICKETS-1);
        })
        it("should update buying status",async ()=>{
            const status = await tokenMaster.hasBought(ID,buyer.address);
            expect (await status).to.equal(true);

        })
        it("should update seat stauts",async ()=>{
            const seat = await tokenMaster.seatOwner(ID,SEAT);
            expect(seat).to.equal(buyer.address);
        })
        it("should update overall seating status",async()=>{
            const seats = await tokenMaster.getSeatsTaken(ID);
            expect(seats.length).to.equal(1);
            expect(seats[0]).to.equal(SEAT);
        })
        it('Updates the contract balance', async () => {
            const balance = await ethers.provider.getBalance(tokenMaster)
            expect(balance).to.equal(AMOUNT)
        })
    })
    describe("withdrawing", async()=>{
        const ID =1;
        const SEAT =50;
        const AMOUNT = ethers.parseEther("1");

        beforeEach(async()=>{
            balanceBefore = await ethers.provider.getBalance(deployer.address)
            let transaction = await tokenMaster.connect(buyer).mint(ID, SEAT,{value: AMOUNT })
            transaction = await tokenMaster.connect(deployer).withdraw()
        })

        it("Should update owner balance",async()=>{
            const balanceAfter = await ethers.provider.getBalance(deployer.address);
            expect(balanceAfter).to.greaterThan(balanceBefore)
        })

        it('Updates the contract balance', async () => {
            const balance = await ethers.provider.getBalance(tokenMaster)
            expect(balance).to.equal(0)
        })
      
    })

})
