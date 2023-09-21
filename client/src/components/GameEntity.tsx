import { useGesture} from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import './GameEntity.css';
import {useState, useRef, useEffect} from "react";



interface Coords {
    x: number,
    y: number,
}

interface EntityProps {
    id: number,
    pos: Coords,
    type: string,
    data: { [key: string]: any },
    bounds: {width: number, height: number},
}



const GameEntity = (entityProps: EntityProps) => {

    // the position of the entity (in the game state / as known to server) - normalised
    const [pos, setPos] = useState(entityProps.pos);

    // position of the entity on the screen - pixel values
    const [{x, y}, api] = useSpring(() => (pos));

    const entityRef = useRef<HTMLDivElement|null>(null);

    useEffect(() => {
        api.set(denormalise(pos));
    }, [entityProps.bounds]);


    function denormalise(position: Coords) {
        return {x: position.x * entityProps.bounds.width, y: position.y * entityProps.bounds.height};
    }

    function normalise(position: Coords) {
        return {x: position.x / entityProps.bounds.width, y: position.y / entityProps.bounds.height};
    }


    // noinspection JSVoidFunctionReturnValueUsed
    const bind = useGesture(
        {
            onDrag: (state) => {
                api.set({
                    x: state.offset[0],
                    y: state.offset[1],
                });
            },
            onDragEnd: (state) => {
                const normalisedPos = normalise({x: state.offset[0], y: state.offset[1]});
                // sendPosToServer(normalisedPos);
                setPos(normalisedPos);
                console.log("New Position: ", normalisedPos);
            }
        }, {
            drag: {
                from: () => [x.get(), y.get()],
                bounds: () => {
                    const w = (entityRef.current?.clientWidth ?? 0) + 4;
                    const h = (entityRef.current?.clientHeight ?? 0) + 4;
                    return {left: 0, top: 0, right: Math.max(entityProps.bounds.width - w, 0), bottom: Math.max(entityProps.bounds.height - h, 0)}
                },
            }
        }
    )

    return (
        <animated.div style={{x, y}} className={'card'} ref={entityRef} {...bind()}>
            Game Entity
        </animated.div>
    );
}

export default GameEntity;

