import {useEffect, useState} from "react";


import "./styles/App.css";
import { connect, createRoom } from "./services/socketService.js";

import {ChakraProvider} from '@chakra-ui/react';

import {Heading, Input, Button} from "@chakra-ui/react";

export default App

function App() {

  const [username, setUsername] = useState("");
  const handleUsernameChange = (e) => setUsername(e.target.value);


  return (
    <ChakraProvider>
      <div className="background"></div>
      <LoginMenu user={username} setUser={handleUsernameChange}/>
    </ChakraProvider>
  )
}


function LoginMenu({user, setUser}) {
  return (
    <div className="menu">
      <Heading>Login</Heading>
      <Input onChange={setUser} placeholder="Username" size="md" width="auto"/>
      <CreateRoomButton user={user}/>
      <JoinRoomButton user={user}/>
    </div>
  );
}

function CreateRoomButton({user}) {

  function doCreateRoom() {
    createRoom(999, user);
  }

  return (
    <Button className="createRoomButton" onClick={doCreateRoom}>Create Room</Button>
  );
}

function JoinRoomButton({user}) {
  function doJoinRoom() {
    connect(999, user);
  }
  return (
    <Button className="joinRoomButton" onClick={doJoinRoom}>Join Room</Button>
  );
}
