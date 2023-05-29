import React, {useState} from "react";
import Coin from "./Coin";
import randomChoice from "./helper";
import tail from "./tail.jpeg";

const CoinContainer = (props) => {
  const [coin, setCoin] = useState(null);
  const [headCount, setHeadCount] = useState(0);
  const [tailCount, setTailCount] = useState(0);

  const handleClick = () => {
    const currCoin = randomChoice(props.coins);
    setCoin(currCoin);
    if(currCoin.side === 'head'){
      setHeadCount(headCount+1);
    } else {
      setTailCount(tailCount+1)
    }
  }

  const generateCoin = coin ? 
    (<Coin src={coin.imgSrc} side={coin.side} />) :
    null;



  return (
    <div className="CoinContainer"> 
      <h1>Coin Flip</h1>
        {generateCoin}

      <button onClick={handleClick}>Flip!</button>  
      <p>Out of {headCount + tailCount} flips, there have been {headCount} heads and {tailCount} tails.</p>
    </div>
    
  )
}

CoinContainer.defaultProps = {
  coins: [
    {
      side: "head",
      imgSrc: "https://tinyurl.com/react-coin-heads-jpg"
    },
    {
      side: "tail",
      imgSrc: tail
    }
  ]
};


export default CoinContainer;