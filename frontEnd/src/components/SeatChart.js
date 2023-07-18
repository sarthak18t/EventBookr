import React, { useEffect, useState } from 'react'
import close from '../assets/close.svg'

const SeatChart = ({occasion,tokenMaster,provider,setToggle}) => {
    const [seatsTaken,setSeatsTaken] = useState(false);
    const [hasSold,setHasSold] = useState(false);

    const getSeatsTaken = async()=>{
        const seatsTaken = await tokenMaster.getSeatsTaken(occasion.id);
        setSeatsTaken(seatsTaken);
    }

    const buyHandler = async(_seat)=>{
        setHasSold(false);
        const signer = provider.getSigner();
        console.log(signer);
        const transaction = await tokenMaster.connect(signer).mint(occasion.id,_seat,{value:occasion.cost})
        console.log(transaction)
        setHasSold(true);
    }
    useEffect(()=>{
        getSeatsTaken();
    },[hasSold])
  return (
    <div className='occasion'>
        <div className='occasion__seating'>
            <h1>{occasion.name} Seating Map</h1>
            <button 
            onClick={setToggle(false)}
            className='occasion__close'
            >
                <img src={close} alt="close"></img>
            </button>
            <div className="occasion__stage">
                 <strong>STAGE</strong>
            </div>

        </div>
    </div>
  )
}

export default SeatChart
