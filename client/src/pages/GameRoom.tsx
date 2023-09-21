import {useState, useRef, useEffect} from "react";
import {Button, Container, Heading} from "@chakra-ui/react";
import {Entity} from "../interfaces/entity.interface";
import GameEntity from "../components/GameEntity";
import './GameRoom.css';

export default GameRoom;

function GameRoom() {

    const playAreaRef = useRef<HTMLDivElement | null>(null);
    const [gameDimensions, setGameDimensions] = useState({width: 0, height: 0});

    const [gameItems, setGameItems] = useState<Entity[]>([]);

    useEffect(() => {
        function handleResize() {
            if (playAreaRef.current) {
                const { width, height } = playAreaRef.current.getBoundingClientRect();
                setGameDimensions({ width, height });
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function addGameItem(newItem: Entity) {
        setGameItems(prevState => [...prevState, newItem]);
    }

    function removeAllItems() {
        setGameItems([]);
    }


    return (
        <div className={"gameRoomView"}>
            <div className={"gamePanel"}>
                <Button onClick={() => addGameItem({id: 1, pos: {x: 0, y: 0}, type: "test", data: {}})}>Add Game
                    Item</Button>
                <Button onClick={() => removeAllItems()}>Remove All Items</Button>
                <div className={"mainArea"} ref={playAreaRef}>
                    {gameItems.map((gameItem) => (
                        <GameEntity id={gameItem.id} pos={gameItem.pos} type={gameItem.type} data={gameItem.data} bounds={gameDimensions}/>
                    ))}
                </div>
            </div>
            <div className={"sidePanel"}>
                <Heading>Side Panel</Heading>
            </div>
        </div>
    )
}

