import React from 'react'
import { ethers } from 'ethers'
const Card = ({occasion,setOccasion,toggle,setToggle}) => {

  const togglePop = async()=>{
    setOccasion(occasion);
    console.log("select occasion",occasion)
    await setToggle(!toggle)
    // toggle ? setToggle(false):setToggle(true);
    console.log(!toggle)
  }
  return (
    <div className='card'>
      <div className='card__info'>
          <p className='card__date'>
            <strong>{occasion.date}</strong>{occasion.time}
          </p>
          <h3 className='card__name'>
            {occasion.name}
          </h3>
          <p className='card__location'>
            <small>{occasion.location}</small>
          </p>
          <p className='card__cost'>
            <strong>
              {ethers.formatUnits(occasion.cost.toString(),"ether")}
              {/* {ethers.formatEther(occasion.cost)} */}
            </strong>
            ETH
          </p>
          {Number(occasion.tickets) === 0?(
            <button 
            className='card__button--out'
            type='button'
            disabled
            >
              SOLD OUT
            </button>
          ):(
            <button
            className='card__button'
            type='button'
            onClick={togglePop}
            >
              VIEW SEATS
            </button>
          )}
      </div>
      <hr></hr>
    </div>
  )
}

export default Card
