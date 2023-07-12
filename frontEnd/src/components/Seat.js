const Seat = ({ i, step, columnStart, maxColumns, rowStart, maxRows, seatsTaken, buyHandler }) => {
    const isSeatTaken = seatsTaken.some(seat => Number(seat) === i + step);
  
    return (
      <div
        onClick={() => buyHandler(i + step)}
        className={isSeatTaken ? "occasion__seats--taken" : "occasion__seats"}
        style={{
          gridColumn: `${(i % maxColumns) + 1 + columnStart}`,
          gridRow: `${Math.ceil((i + 1) / maxRows) + rowStart}`
        }}
      >
        {i + step}
      </div>
    );
  }
  
  export default Seat;
  