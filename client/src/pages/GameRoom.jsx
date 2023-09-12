import {useState} from "react";
import {Button} from "@chakra-ui/react";
import GameItem from "../components/gameItem";

export default GameRoom;

function GameRoom() {

  const [gameItems, setGameItems] = useState([]);

  function addGameItem(newItem) {
    setGameItems(prevState => [...prevState, newItem]);
  }

  return (
    <div>
      <h1>GameRoom</h1>
      <Button onClick={ () => addGameItem({ id: Date.now() }) }>Add Game Item</Button>
      <div>
        {gameItems.map(item => <GameItem key={item.id} data={item}/>)}
      </div>
    </div>
  )
}