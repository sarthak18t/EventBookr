import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Navigation from "./components/Navigation";
import Card from "./components/Card";
import config from "./config.json";
import TokenMaster from "./abis/abi.json";
import SeatChart from "./components/SeatChart";
import AddEvent from "./components/AddEvent";
import add from "./assets/add_event.png";
function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [tokenMaster, setTokenMaster] = useState(null);
  const [occasions, setOccasions] = useState([]);
  const [occasion, setOccasion] = useState({});
  const [toggle, setToggle] = useState(false);
  const [click, setClick] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOccasions, setFilteredOccasions] = useState([]);

  const filterEvents = () => {
    if (searchQuery === "") {
      setFilteredOccasions(occasions);
    } else {
      const filteredOccasions = occasions.filter((occasion) =>
        occasion.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOccasions(filteredOccasions);
    }
  };

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const currentAccount = accounts[0];
          setAccount(currentAccount);

          window.ethereum.on("accountsChanged", (newAccounts) => {
            setAccount(newAccounts[0]);
          });

          const provider = new ethers.BrowserProvider(window.ethereum);
          setProvider(provider);

          const networkId = await provider
            .getNetwork()
            .then((network) => network.chainId);
          const tokenMasterAddress = config[networkId].TicketMaster.address;
          const tokenMasterContract = new ethers.Contract(
            tokenMasterAddress,
            TokenMaster,
            provider
          );
          setTokenMaster(tokenMasterContract);
          console.log("contract ", tokenMasterContract);
          const totalOccasions = await tokenMasterContract.totalOccasions();
          const occasions = [];
          for (let i = totalOccasions; i >= 1; i--) {
            const occasion = await tokenMasterContract.getOccasion(i);
            occasions.push(occasion);
          }
          setOccasions(occasions);
          setFilteredOccasions(occasions);
        } else {
          console.log(
            "Please install MetaMask or another Web3 wallet extension."
          );
        }
      } catch (error) {
        console.error("Error loading blockchain data:", error);
      }
    };

    loadBlockchainData();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [searchQuery]);

  return (
    <div className="App">
      <header>
        <Navigation
          account={account}
          setAccount={setAccount}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <h2 className="header__title">
          <strong>EVENT</strong> TICKETS
        </h2>
      </header>
      <div className="cards">
        {filteredOccasions.map((occasion, index) => (
          <Card
            occasion={occasion}
            setOccasion={setOccasion}
            toggle={toggle}
            setToggle={setToggle}
            key={index}
          />
        ))}
      </div>

      {toggle && (
        <SeatChart
          occasion={occasion}
          tokenMaster={tokenMaster}
          provider={provider}
          setToggle={setToggle}
        />
      )}
      <div className="addEvent">
        <button className="addEvent__button" onClick={() => setClick(true)}>
          <img src={add} alt="add-events"></img>
        </button>
      </div>
    
      {click && (
        <AddEvent
          provider={provider}
          setClick={setClick}
          tokenMaster={tokenMaster}
        />
      )}
    </div>
  );
}

export default App;
