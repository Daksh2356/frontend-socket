import { useEffect, useState } from 'react';
import './App.css';
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:4000");

function App() {

  // Rooms 
  const [room, setRoom] = useState("");
  const [leaveRoom, setLeaveRoom] = useState("");

  // Messages
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  // Join Room Handler
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      console.log(`joined room : ${room}`);
    }
  };

  // Send Message Handler
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
    console.log("emitted");
  };

  // Leave Room Handler
  const leave = () => {
    socket.emit("leave_room", leaveRoom);
    console.log(`left room : ${leaveRoom}`);

  };

  // Receive Message Handler
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMessage(data.message);
      // alert(data.message);
      console.log(data);
    })
  }, []);

  return (
    <div className="App">
      <input id="" placeholder='Room to join...' onChange={(event) => { setRoom(event.target.value) }} />
      <button onClick={joinRoom}
      > Join Room No.</button>
      <br/>
      <br/>
      <input id="" placeholder='Room to leave...' onChange={(event) => { setLeaveRoom(event.target.value) }} />
      <button onClick={leave}
      > Leave Room No.</button>
      <br />
      <br />
      <input placeholder='Message....' onChange={(event) => { setMessage(event.target.value) }} />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Room :</h1>
      <p> room no. : {room} </p>
      <h1>Message : </h1>
      <p>you : {message} <br></br> </p>
      <p> them : {receivedMessage}</p>
    </div>
  );
}

export default App;
