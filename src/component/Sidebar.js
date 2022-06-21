import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { Avatar } from '@mui/material'
import { IconButton } from '@mui/material';
import SidebarChat from './SidebarChat'
import { Chat, DonutLarge, MoreVert, SearchOutlined, Unsubscribe } from '@mui/icons-material'
// firebase import
import db from '../firebase';
import { useStateVAlue } from './StateProvider';
import { auth } from '../firebase';

export default function Sidebar() {

  const [rooms, setRooms] = useState([]);
  const [{user}, dispatch] = useStateVAlue();

  // fills the rooms with objects of data present in the firebase database
  useEffect(() =>{
      const unsubscribed = db.collection('Rooms').onSnapshot(snapshot => (
          setRooms(snapshot.docs.map(doc => (
            {
              id: doc.id,
              data: doc.data(),
            }
          )))
      ));

// clean up of DOM to and database to maintain efficiency
      return () => {
        unsubscribed();
      }
  },[])

  const displaySet = () =>{
    let obj = document.querySelector('.settings');
      if(obj.style.display !== 'none'){
      obj.style.display = 'none';
    }
      else{
      obj.style.display = 'block';
    }
  }

  const signOut= () =>
  {
      if(user) 
      {
          auth.signOut();
          window.location.reload();
      }
  }

  return (
    <div className='sidebar'>
        <div className="sidebar-header">
            <Avatar src={user?.photoURL}/>
            <div className="sidebar-header-right">
                <IconButton>
                <DonutLarge/>
                </IconButton> 

                <IconButton>
                <Chat/>
                </IconButton>

                <IconButton onClick={displaySet}>
                <MoreVert/>
                </IconButton>
            </div>
        </div>
        <div className="settings" onClick={signOut}>
        Signout
        </div>
        <div className="sidebar-search">
          <div className="side-search-cont">
            <SearchOutlined/>
            <input type="text" placeholder='search or start new chat'/>
            </div>
        </div>
        <div className="sidebar-chats">
          {/* rendering the add new chat button */}
          <SidebarChat addNewChat/>
          {/* rendering the chats */}
          {
            rooms.map((room) => (
              <SidebarChat key={room.id} id ={room.id} name={room.data.name}/>
            ))
          }
        </div>
    </div>
  )
}

