import {useEffect, useState} from "react";
import {ChakraProvider, Heading, Input, Button, useToast} from "@chakra-ui/react";


import "./styles/App.css";
import { socketService as ss } from "./services/socketService.js";

import Home from "./pages/Home.jsx";
import GameRoom from "./pages/GameRoom.jsx";


export default App

function App() {

  const [page, setPage] = useState("Home");


  const [username, setUsername] = useState("");
  let usernameSelected = false;
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    usernameSelected = true;
  }


  return (
    <ChakraProvider>
      {page === "Home" && <Home user={username} setUser={handleUsernameChange} userSelected={usernameSelected} setPage={setPage}/>}
      {page === "GameRoom" && <GameRoom />}
    </ChakraProvider>
  )
}

