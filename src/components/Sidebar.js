import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  if (!isMenuOpen) return null;
  return (
    <div className="px-6 shadow-lg w-48">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>Shorts</li>
        <li>Subscriptions</li>
        <li>Live</li>
      </ul>
      {/* <h1 className="font-bold pt-5">Subscriptions</h1> */}
      <ul className="pt-5">
        <li>You</li>
        <li>History</li>
      </ul>
      <h1 className="font-bold pt-5">Explore</h1>
      <ul>
        <li>Trending</li>
        <li>Shopping</li>
        <li>Music</li>
        <li>Movies</li>
        <li>Live</li>
        <li>News</li>
        <li>Sports</li>
        <li>Learning</li>
        <li>Fashion</li>
        <li>Podcasts</li>
      </ul>
    </div>
  );
};

export default Sidebar;
