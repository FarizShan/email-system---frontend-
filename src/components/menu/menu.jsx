// import React from "react";
// import { Link } from "react-router-dom";
// import { Inbox, Send, AlertOctagon, Trash } from "lucide-react";
// import "./menu.css";

// export default function MenuPage() {
//   return (
//     <div className="menu-container">
//       {/* Header */}
//       <header className="menu-header">
//         <span className="menu-logo">InVision</span>
//         <Link to="/logout" className="menu-logout">Logout</Link>
//       </header>

//       {/* Main Content */}
//       <main className="menu-main">
//         <h1 className="menu-title">MENU PAGE</h1>
//         <p className="menu-subtitle">What would you like to do?</p>

//         {/* Buttons */}
//         <div className="menu-buttons">
//           <Link to="/inbox" className="menu-btn">
//             <Inbox className="icon" /> Inbox
//           </Link>
//           <Link to="/compose" className="menu-btn">
//             <Send className="icon" /> Compose
//           </Link>
//           <Link to="/spam" className="menu-btn">
//             <AlertOctagon className="icon" /> Spam
//           </Link>
//           <Link to="/trash" className="menu-btn">
//             <Trash className="icon" /> Trash
//           </Link>
//         </div>
//       </main>
//     </div>
//   );
// }

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Inbox, Send, AlertOctagon, Trash } from "lucide-react";
import "./menu.css";

export default function MenuPage() {
  const navigate = useNavigate(); // Initialize useNavigate for routing

  const handleLogout = () => {
    // Perform any necessary logout logic here, such as clearing session or authentication data
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="menu-container">
      {/* Header */}
      <header className="menu-header">
        <span className="menu-logo">InVision</span>
        <button onClick={handleLogout} className="menu-logout">
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="menu-main">
        <h1 className="menu-title">MENU PAGE</h1>
        <p className="menu-subtitle">What would you like to do?</p>

        {/* Buttons */}
        <div className="menu-buttons">
          <Link to="/inbox" className="menu-btn">
            <Inbox className="icon" /> Inbox
          </Link>
          <Link to="/compose" className="menu-btn">
            <Send className="icon" /> Compose
          </Link>
          <Link to="/spam" className="menu-btn">
            <AlertOctagon className="icon" /> Spam
          </Link>
          <Link to="/trash" className="menu-btn">
            <Trash className="icon" /> Trash
          </Link>
        </div>
      </main>
    </div>
  );
}

