import {
  AttachFile,
  DonutLarge,
  MoreVert,
  InsertEmoticon,
  Mic,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import db from "../firebase";
import { useStateVAlue } from "./StateProvider";
import firebase from "firebase/compat/app";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomid } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateVAlue();
  let navigate = useNavigate();
  // for autoscroll
  const messageRef = useRef();

  useEffect(() => {
    if (roomid) {
      db.collection("Rooms")
        .doc(roomid)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("Rooms")
        .doc(roomid)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomid]);

  function sendMessage(e) {
    e.preventDefault();

    db.collection("Rooms").doc(roomid).collection("messages").add({
      name: user.displayName,
      msg: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  }

  function deleteChat()
  {
      console.log('delete');
      firebase.firestore().collection("Rooms").doc(roomid).delete();
      navigate('/rooms/nzgjXdO8UHJySOzaL71I');
  }

  // for autoscrolling
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView(
        {
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        })
    }
  },
  [messages])

  return (
    <div className="chat">
      <div className="chat-head">
        <Avatar
          src={`https://avatars.dicebear.com/api/avataaars/${roomid}.svg`}
          //   sx = {{
          //     width: '300px',
          //     height: '200px'
          //   }}
        />
        <div className="chat-head-info">
          <h3>{roomName}</h3>
          <p>
            Last seen{" "}
            {messages.length? (new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()): ("long ago")}
          </p>
        </div>
        <div className="chat-head-right">
          <IconButton>
            <DonutLarge />
          </IconButton>
            
            { roomid!== 'nzgjXdO8UHJySOzaL71I' ? (<IconButton onClick={deleteChat}>
          <DeleteIcon/>
          </IconButton>):('')}
          

          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat-body">
        {messages.map((message) => (
          <p
            className={`chat-msg ${
              message.name === user.displayName && "chat-receiver"
            }`}
          >
            <span className="chatName">{message.name}</span>
            {message.msg}
            <span className="chat-time">
              {message.timestamp?(new Date(message.timestamp?.toDate()).toUTCString()): ('sending...')}
            </span>
          </p>
        ))}
        {/* for autoscrolling */}
      <div ref={messageRef}></div>
      </div>
      <div className="chat-footer">
        <InsertEmoticon />
        <form onSubmit={sendMessage}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit">Send a message</button>
        </form>
        <Mic />
      </div>
    </div>
  );
}
