import React, { useState } from "react";
import close from "../assets/close.svg";
import { ethers } from "ethers";
import config from "../config.json"
const AddEvent = ({ setClick, tokenMaster, provider }) => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [tickets, setTickets] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setName("");
    setCost(0);
    setTickets(0);
    setDate("");
    setTime("");
    setLocation("");
  };

  const addOccasion = async ()=>{
    console.log('Name:', name);
    console.log('Cost:', cost);
    console.log('Tickets:', tickets);
    console.log('Date:', date);
    console.log('Time:', time);
    console.log('Location:', location);
    // const bnCost = new BigNumber(cost.toString() + 'N');
    // const bnTickets = new BigNumber(tickets.toString() + 'N');
    // console.log(bnCost)
    // console.log(bnTickets) 
    const costEth = ethers.parseEther(cost.toString())
    const deployer = await provider.getSigner();
    console.log(deployer)
    const netorkID = await provider.getNetwork().then((network)=>network.chainId)
    if(deployer.address !== config[netorkID].TicketMaster.address){
      alert("You cannot add event !!")
    }else{
      await tokenMaster.connect(deployer).list(name,costEth,tickets,date,time,location)
    }
    setClick(false)
  }
  return (
    <div className="occasion">
      <div className="addEvent__close">
        <button className="occasion__close" onClick={() => setClick(false)}>
          <img src={close} alt="close"></img>
        </button>
      </div>
      <div className="form-container">
        <div className="addEvent__form">
          <h1>ADD EVENT</h1>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div className="addEvent-form-group">
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
            </div>
            <div className="addEvent-form-group">
              <label htmlFor="cost">Cost :</label>
              <input
                type="number"
                id="cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                required
              ></input>
            </div>
            <div className="addEvent-form-group">
              <label htmlFor="tickets">Tickets :</label>
              <input
                type="number"
                id="tickets"
                value={tickets}
                onChange={(e) => setTickets(e.target.value)}
                required
              ></input>
            </div>
            <div className="addEvent-form-group">
              <label htmlFor="date">Date :</label>
              <input
                type="text"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              ></input>
            </div>
            <div className="addEvent-form-group">
              <label htmlFor="time">Time :</label>
              <input
                type="text"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              ></input>
            </div>
            <div className="addEvent-form-group">
              <label htmlFor="location">Location :</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              ></input>
            </div>
            <button className="addEvent-form-group-button" type="submit"onClick={addOccasion}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
