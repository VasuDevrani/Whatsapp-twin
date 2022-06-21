import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import db from "../firebase";
import { Link } from "react-router-dom";

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  // to produce random avatars on chat
  // useEffect(() =>{
  //     setSeed(
  //       Math.floor(Math.random()*5000)
  //     )
  // },[])

  useEffect(() => {
    if (id) {
      db.collection("Rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, []);

  function createChat() {
    const roomName = prompt("Enter room name");
    // if room name is entered then a new room is created in the firebase database by post method
    // adding of new name triggers the useEffect and changes the sidebar chat

    if (roomName) {
      // database stuff
      db.collection("Rooms").add({
        name: roomName,
      });
    }
  }

  return !addNewChat ? (
    <Link
      to={`/rooms/${id}`}
      style={{ color: "black", textDecoration: "none" }}
    >
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/avataaars/${id}.svg`} />
        <div className="sidebar-chat-info">
          <h2>{name}</h2>
          <p>{messages[0]?.msg}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
