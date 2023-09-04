import {Button, Heading, Input, useToast} from "@chakra-ui/react";
import {socketService as ss} from "../services/socketService.js";
import {useEffect, useState} from "react";
import {RoomTable} from "../components/roomTable.jsx";

export default Home;

function Home({user, setUser, userSelected, setPage}) {

  const [menu, setMenu] = useState("Login");

  console.log("Home render");

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
  useEffect(() => {
    ss.onInvalidUsername(() => {
      toast({
        title: "That username is invalid.",
        status: "error",
        isClosable: true,
        position: "bottom"
      });
    });
    return () => {
      ss.onInvalidUsername(null);
    }
  }, [toast]);

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

  const toast = useToast();

  const [roomName, setRoomName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(10);
  const handleRoomNameChange = (e) => setRoomName(e.target.value);
  const handleMaxPlayersChange = (e) => setMaxPlayers(e.target.value);

  useEffect(() => {
    ss.onRoomOpSuccess((roomId) => {
      setPage("GameRoom");
      toast({
        title: "Room successfully created.",
        status: "success",
        isClosable: true,
        position: "bottom"
      });
    });
    ss.onRoomOpFail((error_msg) => {
      toast({
        title: "Failed to create room.",
        status: "error",
        isClosable: true,
        position: "bottom"
      });
    });
    return () => {
      ss.onRoomOpSuccess(null);
      ss.onRoomOpFail(null);
    }
  }, [toast, setPage]);



  return (
    <div className="menu">
      <Heading>Create Room</Heading>
      <Input placeholder="Room Name" onChange={handleRoomNameChange} size="md" width="auto"/>
      <Input placeholder="Max Players" onChange={handleMaxPlayersChange} size="md" width="auto"/>
      <Button className="continueButton" onClick={() => ss.createRoomRequest(roomName, maxPlayers)}>Create Room</Button>
    </div>
  );
}

// sub-menu for selecting an existing room to join
function JoinRoomMenu({user, setPage, setMenu}) {

  const toast = useToast();
  const [roomsData, setRoomsData] = useState(null);
  const [roomIdToJoin, setRoomIdToJoin] = useState(null);

  // TODO: fix the UI

  useEffect(() => {
    ss.onRoomOpSuccess((roomId) => {
      setPage("GameRoom");
      toast({
        title: "Joined room.",
        status: "success",
        isClosable: true,
        position: "bottom"
      });
    });
    ss.onRoomOpFail((error_msg) => {
      toast({
        title: "Failed to join room.",
        status: "error",
        isClosable: true,
        position: "bottom"
      });
    });
    ss.onRoomListUpdate( (rooms) => {
      setRoomsData(rooms)
    });
    ss.requestRoomList();

    return () => {
      ss.onRoomListUpdate(null);
      ss.onRoomOpSuccess(null);
      ss.onRoomOpFail(null);
    }
  }, [toast, setPage]);

  function doJoinRoom() {
    ss.joinRoomRequest(roomIdToJoin);
  }

  return (
    <div className="menu">
      <Heading>Join Existing Room</Heading>
      <RoomTable availableRoomsData={roomsData} setSelected={setRoomIdToJoin}/>
      <Button className="genericButton" onClick={() => ss.requestRoomList()}>Refresh List</Button>
      <Button className="continueButton" onClick={doJoinRoom}>Select Room</Button>
      <Heading>{roomIdToJoin}</Heading>
    </div>
  );
}

function CreateRoomButton({user, setMenu}) {
  function doCreateRoom() {
    if (ss.isConnected()) {
      setMenu("JoinRoom");
      return;
    }
    ss.onConnectionSuccess(() => setMenu("CreateRoom"));
    ss.connectServer(user);
  }
  return (
    <Button className="continueButton" onClick={doCreateRoom}>Create Room</Button>
  );
}

function JoinRoomButton({user, setMenu}) {
  function doJoinRoom() {
    if (ss.isConnected()) {
      setMenu("JoinRoom");
      return;
    }
    ss.onConnectionSuccess(() => setMenu("JoinRoom"));
    ss.connectServer(user);
  }
  return (
    <Button className="continueButton" onClick={doJoinRoom}>Join Room</Button>
  );
}
