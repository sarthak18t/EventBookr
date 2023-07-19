import React, { useState } from 'react'
import {ethers} from "ethers"
const Navigation = ({account,setAccount,searchQuery,setSearchQuery}) => {
    

    const connectHandler = async ()=>{
        const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
        const getAccount = ethers.getAddress(accounts[0]);
        setAccount(getAccount);
    }

  return (
    <nav>
        <div className='nav__brand'>
            <h1>EVENTBOOKR</h1>
            <input 
            className='nav__search' 
            type='text' 
            placeholder='search for latest events'
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
            ></input>
        </div>
        {
            account?(
                <button type='button' className='nav__connect'>
                    {account.slice(0,6)+"..."+account.slice(38,42)}
                </button>
            ):(
                <button type='button' className='nav__connect' onClick={connectHandler}>
                    Connect
                </button>
            )
        }
    </nav>
  )
}

export default Navigation;
