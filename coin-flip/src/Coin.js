import React from "react";
import './Coin.css';

const Coin = (props) => {
  return (
    <div className="Coin">
      <img src={props.src} alt={props.side}></img>
    </div>
  )
}

export default Coin;