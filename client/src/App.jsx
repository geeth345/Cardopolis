import {useState} from "react";

import "./styles/App.css";

import { ChakraProvider } from '@chakra-ui/react';

import { Heading, Input, Button } from "@chakra-ui/react";

function App() {

    const [username, setUsername] = useState("");

  return (
    <ChakraProvider>
        <LoginMenu />
    </ChakraProvider>
  )
}

export default App


function LoginMenu( {username} ) {
    return (
        <div className="menu">
            <Heading>Login</Heading>
            <Input placeholder="Username" size="md" width="auto"/>
            <CreateRoomButton />
            <JoinRoomButton />
        </div>
    );
}

function CreateRoomButton() {
    return (
        <Button className="createRoomButton">Create Room</Button>
    );
}

function JoinRoomButton() {
    return (
        <Button className="joinRoomButton">Join Room</Button>
    );
}
