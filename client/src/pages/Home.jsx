import {Button, Heading, Input, useToast} from "@chakra-ui/react";
import {socketService as ss} from "../services/socketService.js";
import {useState} from "react";
import {RoomTable} from "../components/roomTable.jsx";

export default Home;

function Home({user, setUser, userSelected, setPage}) {

  const [menu, setMenu] = useState("Login");

  return (
    <div>
      <div className="background"></div>
      { menu === "Login" && <LoginMenu {...{user, setUser, userSelected, setPage}} setMenu={setMenu}/> }
      { menu === "CreateRoom" && <CreateRoomMenu user={user} setMenu={setMenu} setPage={setPage}/> }
      { menu === "JoinRoom" && <JoinRoomMenu user={user} setMenu={setMenu} setPage={setPage}/> }
    </div>
  )
}

// the login menu, displayed when the user first opens the page. incl. a username field and buttons
// to join or create a room
function LoginMenu({user, setUser, userSelected, setPage, setMenu}) {
  const toast = useToast();
  ss.onInvalidUsername(() => {
    toast({
      title: "That username is invalid.",
      status: "error",
      isClosable: true,
      position: "bottom"
    });
  });
  return (
    <div className="menu">
      <Heading>Login</Heading>
      <Input onChange={setUser} placeholder="Username" size="md" width="auto"/>
      <CreateRoomButton {...{user, setMenu}}/>
      <JoinRoomButton {...{user, setMenu}}/>
    </div>
  );
}

// the room creation sub menu
function CreateRoomMenu({user, setPage, setMenu}) {
  return (
    <Heading>Create Room</Heading>
  );
}

// sub-menu for selecting an existing room to join
function JoinRoomMenu({user, setPage, setMenu}) {
  return (
    <Heading>Join Room</Heading>
  );
}

function CreateRoomButton({user, setMenu}) {
  function doCreateRoom() {
    ss.onConnectionSuccess(() => setMenu("CreateRoom"));
    ss.connectServer(user);
  }
  return (
    <Button className="createRoomButton" onClick={doCreateRoom}>Create Room</Button>
  );
}

function JoinRoomButton({user, setMenu}) {
  function doJoinRoom() {
    ss.onConnectionSuccess(() => setMenu("JoinRoom"));
    ss.connectServer(user);
  }
  return (
    <Button className="joinRoomButton" onClick={doJoinRoom}>Join Room</Button>
  );
}
