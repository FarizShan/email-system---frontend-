import React from "react";
import Login from "./components/login/login";
import Menu from "./components/menu/menu";
import Inbox from "./components/inbox/inbox";
import Sent from "./components/sent/sent";
import Compose from "./components/compose/compose";
import Loader from "./components/loader/loader";
import Register from "./components/register/register"
import Trash from "./components/trash/trash"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/spam" element={<Spam />} /> */}
        <Route path="/" element={<Loader />} /> {/* Loader as root */}
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/sent" element={<Sent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trash" element={<Trash />} />
      </Routes>
    </Router>
  );
}

export default App;
