import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl, key } from "../config";
import Item from "./Item";
import "./List.scss";
import "../../Sass/Grid.scss";

function LNewRelease() {
  const [newRelease, setNewRelease] = useState([]);
  const [type, setType] = useState("trending/movie/week");

  useEffect(() => {
    axios
      .get(BaseUrl + `${type}` + key)
      .then((response) => setNewRelease(response.data.results.slice(0, 15)));
  }, [type]);

  const handleGetApi = (e) => {
    const navigation = document.querySelectorAll("#li");
    for (let key of navigation) {
      key.classList.remove("active");
    }
    setType(e.target.getAttribute("value"));
    e.target.classList.add("active");
  };

  return (
    <div className="list grid wide">
      <div className="list-navigation">
        <div className="list-navigation-left flex-column">
          <h1>Recommended</h1>
          <ul className="row">
            <li
              id="li"
              className="active"
              onClick={(e) => handleGetApi(e)}
              value="trending/movie/week"
            >
              Featured
            </li>
            <li
              id="li"
              onClick={(e) => handleGetApi(e)}
              value="movie/top_rated"
            >
              Top Rating
            </li>
            <li id="li" onClick={(e) => handleGetApi(e)} value="tv/top_rated">
              TV Top Rating
            </li>
            <li
              id="li"
              onClick={(e) => handleGetApi(e)}
              value="tv/airing_today"
            >
              TV Airing Today
            </li>
            <li id="li" onClick={(e) => handleGetApi(e)} value="tv/on_the_air">
              TV On The Air
            </li>
          </ul>
        </div>
      </div>
      <div>
        <Item array={newRelease} type={type} />
      </div>
    </div>
  );
}

export default LNewRelease;
