import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Navigation from "./components/Navigation";
import Card from "./components/Card";
import config from "./config.json";
import TokenMaster from "./abis/abi.json";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [tokenMaster, setTokenMaster] = useState(null);
  const [occasion, setOccasion] = useState([]);
  const [toggle, setToggle] = useState(false);

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

          const networkId = await provider.getNetwork().then((network) => network.chainId);
          const tokenMasterAddress = config[networkId].TicketMaster.address;
          const tokenMasterContract = new ethers.Contract(
            tokenMasterAddress,
            TokenMaster,
            provider
          );
          setTokenMaster(tokenMasterContract);
          console.log(tokenMasterContract)
          const totalOccasions = await tokenMasterContract.totalOccasions();
          const occasions = [];
          for (let i = 1; i <= totalOccasions; i++) {
            const occasion = await tokenMasterContract.getOccasion(i);
            occasions.push(occasion);
          }
          setOccasion(occasions);
        } else {
          console.log("Please install MetaMask or another Web3 wallet extension.");
        }
      } catch (error) {
        console.error("Error loading blockchain data:", error);
      }
    };

    loadBlockchainData();
  }, []);

  return (
    <div className="App">
      <header>
        <Navigation account={account} setAccount={setAccount} />
        <h2 className="header__title">
          <strong>EVENT</strong> TICKETS
        </h2>
      </header>
      <div className="cards">
        {occasion.map((occasion, index) => (
          <Card
            occasion={occasion}
            id={index + 1}
            tokenMaster={tokenMaster}
            provider={provider}
            account={account}
            toggle={toggle}
            setToggle={setToggle}
            setOccasion={setOccasion}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default App;




// import { useEffect,useState } from "react";
// import { ethers } from "ethers";
// import Navigation from "./components/Navigation";
// import Card from "./components/Card";
// import config from "./config.json"
// import TokenMaster from "./abis/abi.json"
// function App() {
//   const [provider,setProvider] = useState(null);
//   const [account,setAccount] = useState(null);
//   const [tokenMaster,setTokenMaster] = useState(null);
//   const [occasion,setOccasion] = useState([]);
//   const [toggle,setToggle] = useState(false)
//   const loadBlockChainData = async()=>{
//     window.ethereum.on("accountsChanged",async()=>{
//       const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
//       console.log(accounts)
//       const getAccount = ethers.getAddress(accounts[0]);
//       console.log(getAccount);
//       setAccount(getAccount)
//       console.log(account);
//     })
//     const getProvider = new ethers.BrowserProvider(window.ethereum);
    
//     setProvider(getProvider);
    
//     const getTokenMaster = new ethers.Contract(config["31337"].TicketMaster.address, TokenMaster, provider)
//     setTokenMaster(getTokenMaster);
//     console.log(tokenMaster);
//     if(tokenMaster){

//     const totalOccasions = await tokenMaster.totalOccasions();
//     console.log(totalOccasions);
//     const occasions = [];
//     for (var i = 1; i <= totalOccasions; i++) {
//       const occasion = await tokenMaster.getOccasion(i)
//       console.log(occasion);
//       occasions.push(occasion)
//     }
//    setOccasion(occasions);
//   }
//   }
//   useEffect(()=>{
//     loadBlockChainData();
//   },[])
//   return (
//     <div className="App">
//       <header>
//         <Navigation account={account} setAccount={setAccount}/>
//         <h2 className="header__title"><strong>EVENT </strong> TICKETS</h2>
//       </header>
//       <div className="cards">
//           {occasion.map((occasion,index)=>{
//               return <Card
//               occasion={occasion}
//               id={index + 1}
//               tokenMaster={tokenMaster}
//               provider={provider}
//               account={account}
//               toggle={toggle}
//               setToggle={setToggle}
//               setOccasion={setOccasion}
//               key={index}
//               />
//           })}
//       </div>
//     </div>
//   );
// }

// export default App;

