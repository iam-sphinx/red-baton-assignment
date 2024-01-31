import React, { useEffect, useState } from "react";
import logo from "../images/y18.svg";
import { Link } from "react-router-dom";

// logic for logout
const Header = () => {
  const [user, setUser] = useState(true);
  const handleLogout = () => {
    localStorage.setItem("data", {});
  };

  useEffect(() => {
    if (localStorage.getItem("data")) {
      setUser(localStorage.getItem("data"));
    }
  });
  return (
    <div className="flex items-center justify-between p-1 w-full bg-[#ff6600]">
      <div className="flex items-center gap-2">
        <div className="border border-white h-4">
          <img src={logo} alt="logo" className="w-full h-full object-cover" />
        </div>
        <span className="text-sm font-semibold">Hacker News</span>
        {/* Nav list */}
        <ul className=" ml-3 h-[10px] flex gap-1 text-sm items-center">
          <li>
            <Link to="/welcome">
              <span>welcome</span>
            </Link>
            <span>{` | `}</span>
          </li>
          <li>
            <Link to="/new">
              <span>new</span>
            </Link>
            <span>{` | `}</span>
          </li>
          <li>
            <Link to="/threads">
              <span>threads</span>
            </Link>
            <span>{` | `}</span>
          </li>
          <li>
            <Link to="/past">
              <span>past</span>
            </Link>
            <span>{` | `}</span>
          </li>
          <li>
            <Link to="/comments">
              <span>comments</span>
            </Link>
            <span>{` | `}</span>
          </li>
          <li>
            <Link to="/ask">
              <span>ask</span>
            </Link>
            <span>{` | `}</span>
          </li>
          <li>
            <Link to="/show">
              <span>show</span>
            </Link>
            <span>{` | `}</span>
          </li>
          <li>
            <Link to="/jobs">
              <span>jobs</span>
            </Link>
            <span>{` | `}</span>
          </li>
          <li>
            <Link to="/submit">
              <span>submit</span>
            </Link>
            <span>{` | `}</span>
          </li>
          <li>
            <Link to="/form">
              <span>form</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* User */}
      {user ? (
        <div className="flex gap-1 text-sm items-center">
          <Link to="/profile">
            <span>Kandarp18</span>
            <span>{` | `}</span>
          </Link>

          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link to="/login" className="flex items-center">
          <span className="text-sm">login</span>
        </Link>
      )}
    </div>
  );
};

export default Header;
