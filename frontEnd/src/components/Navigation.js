import React from 'react'
import {ethers} from "ethers"
const Navigation = ({account,setAccount}) => {
    const connectHandler = async ()=>{
        const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
        const getAccount = ethers.getAddress(accounts[0]);
        setAccount(getAccount);
    }
  return (
    <nav>
        <div className='nav__brand'>
            <h1>TOKENMASTER</h1>
            <input className='nav__search' type='text' placeholder='find millions of experience'></input>
            <ul className='nav__links'>
                <li><a href="/">Concerts</a></li>
                <li><a href="/">Sports</a></li>
                <li><a href="/">Arts & Theater</a></li>
                <li><a href="/">More</a></li>
            </ul>
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

export default Navigation