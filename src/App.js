import "./App.css";
import Chat from "./component/Chat";
import { Routes, Route, Link } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import { useState } from "react";
import Login from "./component/Login";
import { useStateVAlue } from "./component/StateProvider";

function App() {
  const [{ user }, dispatch] = useStateVAlue();
  let minWidth =  720;

  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className="app-body">
          <Sidebar />
          <Routes>
            {/* chat */}
            <Route path="/rooms/:roomid" element={<Chat />} />
            <Route path="/" element={<Chat />} />
          </Routes>
          {/* {window.screen.innerWidth >= minWidth ? (
            <>
              <Sidebar />
              <Routes>
                <Route path="/rooms/:roomid" element={<Chat />} />
                <Route path="/" element={<Chat />} />
              </Routes>
            </>
          ) : (
            <Routes>
              <Route path="/" element={<Sidebar />} />
              <Route path="/rooms/:roomid" element={<Chat />} />
            </Routes>
          )} */}
        </div>
      )}
    </div>
  );
}

export default App;