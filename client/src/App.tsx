import React, { useState} from "react";
import { ChakraProvider } from "@chakra-ui/react";


import "./styles/App.css";

import Home from "./pages/Home";
import GameRoom from "./pages/GameRoom";


export default App

function App() {

  const [page, setPage] = useState("Home");


  const [username, setUsername] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };


  return (
    <ChakraProvider>
      {page === "Home" && <Home user={username} setUser={handleUsernameChange} setPage={setPage}/>}
      {page === "GameRoom" && <GameRoom />}
    </ChakraProvider>
  )
}

