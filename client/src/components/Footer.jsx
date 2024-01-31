import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    const query = event.target.value;
    setSearch(query);
  };
  return (
    <div className="h-20 border-t-2 border-[#ff6600] flex flex-col items-center justify-center gap-2">
      <ul className="flex gap-1 text-xs">
        <li>
          <Link to="/guidelines">
            <span>Guidelines</span>
          </Link>
          <span>{` | `}</span>
        </li>
        <li>
          <Link to="/faq">
            <span>FAQ</span>
          </Link>
          <span>{` | `}</span>
        </li>
        <li>
          <Link to="/lists">
            <span>Lists</span>
          </Link>
          <span>{` | `}</span>
        </li>
        <li>
          <Link to="/api">
            <span>API</span>
          </Link>
          <span>{` | `}</span>
        </li>
        <li>
          <Link to="/security">
            <span>Security</span>
          </Link>
          <span>{` | `}</span>
        </li>
        <li>
          <Link to="/legal">
            <span>Legal</span>
          </Link>
          <span>{` | `}</span>
        </li>
        <li>
          <Link to="/carrers">
            <span>Apply to YC</span>
          </Link>
          <span>{` | `}</span>
        </li>
        <li>
          <Link to="/contact">
            <span>Contact</span>
          </Link>
        </li>
      </ul>

      {/* Search bar */}
      <div className="flex gap-2">
        <span className="text-sm">Search: </span>
        <input className="outline-none border border-black text-ellipsis px-2 text-base" type="text" value={search} onChange={handleChange} />
      </div>
    </div>
  );
};

export default Footer;
