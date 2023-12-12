import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/contants";
import store from "../utils/Store";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    // console.log(json[1]);
    setSuggestions(json[1]);

    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="grid grid-flow-col p-4 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          alt="menu"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8AAADp6ent7e0JCQk/Pz8PDw+Pj4+Hh4fDw8P7+/vV1dXg4OAZGRltbW3c3NwgICBgYGBnZ2ewsLCkpKRPT080NDR1dXVFRUXAwMB/f3/k5OS6urp5eXkpKSmzs7OMjIyXl5fPz89aWlquczz2AAABoUlEQVR4nO3d7U4aQRSA4ZWvygoiAoK2tS69/3usGH8725xNzrg8zxWcN8N+kMxkmwYAAAAAAAAAAAAA/tO0Uu0wee3+8LCo09PxboDA1cNNzW7jgdkJJcdo4Sm7oOg5FrjMnr/sFCt8yZ6/h5+hwm32+D3E7qfjLxz/r3T8d5pv8LT4FSwc/xO/Wc2yG770Oxz4bj9fz6q0eH0c4s37Yjqp00D/ngAAAAAAAAAAgKuy6Q7zKp3u/wyxK6q9z96c95VZcKf+JfApO6JgFy2segU/rGKBd9nzl21jhW/Z8/cwCRU+Zo/fwyZU+Dd7/B7OocJj9vg9xG41u+zxy15jT/12kR1Q1IUCm+Y5O6BkHgys/nc6n4YLm03F59fW3TAHEtrzsk6xU2sAAAAAAAAAAMB1as/djzrthtkUta/5AxfbATbu1X4cIbbL+12XXVAUXMVJ9vxlL2Nfwpt1bBFrvwovnLe49jXssscvC16H3+BeGv06QpcdUBR+q6n9Shzg+w/7mg8GHWKHDz+1y+62Sm+78EspAAAAAAAAAAAAAIzOP09WOq3tUN5KAAAAAElFTkSuQmCC"
        />
        <a href="/">
          <img
            className="h-8 mx-2"
            alt="youtube-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1200px-YouTube_Logo_2017.svg.png"
          />
        </a>
      </div>
      <div className="col-span-10 px-56">
        <div>
          <input
            className="w-1/2 border border-gray-500 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            placeholder="search"
          />
          <button className="px-5 py-2 border border-gray-500 rounded-r-full bg-gray-300">
            🔍
          </button>
        </div>
        {showSuggestions && (
          <div className="fixed bg-white w-[22.7rem] shadow-lg rounded-lg border border-gray-50">
            <ul>
              {suggestions.map((s) => (
                <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-200">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className="h-8"
          alt="user-icon"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        />
      </div>
    </div>
  );
};

export default Head;
