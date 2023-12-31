import {  useState} from 'react';
import './App.css';
import io from 'socket.io-client'
import Chat from './Chat';
const socket=io.connect("http://localhost:3003")
function App() {
  //hello world
  const [username,setUsername]=useState("")
  const [room,setRoom]=useState("")
  const [showChat,setShowChat]=useState(false);
  const joinRoom=async ()=>{
    if(username!=="" && room!==""){
      setShowChat(true);
      await socket.emit("join_room",room) 
    }
  }
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter Room ID"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
