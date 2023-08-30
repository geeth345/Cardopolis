import {Button, Heading, Input, useToast} from "@chakra-ui/react";
import {socketService as ss} from "../services/socketService.js";
import {useState} from "react";

export default Home;

function Home({user, setUser, userSelected, setPage}) {

  const [menu, setMenu] = useState("Login");

  return (
    <div>
      <div className="background"></div>
      { menu === "Login" && <LoginMenu {...{user, setUser, userSelected, setPage}}/> }
      { menu === "CreateRoom" && <CreateRoomMenu user={user} setMenu={setMenu} setPage={setPage}/> }
      { menu === "JoinRoom" && <JoinRoomMenu user={user} setMenu={setMenu} setPage={setPage}/> }
    </div>
  )
}


function LoginMenu({user, setUser, userSelected, setPage}) {
  return (
    <div className="menu">
      <Heading>Login</Heading>
      <Input onChange={setUser} placeholder="Username" size="md" width="auto"/>
      <CreateRoomButton user={user}/>
      <JoinRoomButton user={user}/>
    </div>
  );
}

function CreateRoomMenu({user, setPage, setMenu}) {

}

function JoinRoomMenu({user, setPage, setMenu}) {

}

function CreateRoomButton({user}) {

  function doCreateRoom() {
    ss.createRoom(999, user);
  }

  return (
    <Button className="createRoomButton" onClick={doCreateRoom}>Create Room</Button>
  );
}

function JoinRoomButton({user}) {
  const toast = useToast();
  ss.onInvalidUsername(() => {
    toast({
      title: "That username is invalid.",
      status: "error",
      isClosable: true,
      position: "bottom"
    });
  });

  function doJoinRoom() {
    ss.joinRoomReq(999, user);
  }
  return (
    <Button className="joinRoomButton" onClick={doJoinRoom}>Join Room</Button>
  );
}
