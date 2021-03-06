import React, { useState, useEffect } from "react";
import { BaseUrl, key, img_500, unavailable } from "../config";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent } from "@mui/material";
import { Link } from "react-router-dom";
import "../../Sass/Grid.scss";
import "./Cast.scss";

function Cast(props) {
  const [cast, setCast] = useState([]);
  const [open, setOpen] = useState(false);
  const [credit, setCredit] = useState({});

  useEffect(() => {
    axios
      .get(BaseUrl + props.type + "/" + props.id + "/credits" + key)
      .then((response) => setCast(response.data));
  }, [props]);

  const handleClickOpen = (creditID) => {
    axios
      .get(BaseUrl + "credit/" + creditID + key)
      .then((response) => setCredit(response.data.person));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChoose = () => {
    setOpen(false);
    window.scroll(0, 0);
  };

  return (
    <div className="cast grid wide">
      <h2 className="trailer-title">Cast</h2>
      <div className="cast-items">
        {cast.cast
          ? cast.cast.map((item, i) => {
              return (
                <div
                  className="cast-item"
                  key={i}
                  onClick={() => handleClickOpen(item.credit_id)}
                >
                  <img
                    src={
                      item.profile_path
                        ? img_500 + item.profile_path
                        : unavailable
                    }
                    alt=""
                  />
                  <h3>{item.name}</h3>
                  <span>{item.character}</span>
                </div>
              );
            })
          : null}
      </div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth>
        <DialogTitle
          style={{
            color: "red",
            textTransform: "uppercase",
            backgroundColor: "#ddd",
            display: "flex",
            gap: "20px",
          }}
        >
          <img
            style={{ width: "100px" }}
            src={img_500 + credit.profile_path}
            alt=""
          />
          {credit.name}
        </DialogTitle>

        <DialogContent
          style={{ backgroundColor: "#181818", overflow: "hidden" }}
        >
          <h1 className="cast-movie">Known For</h1>
          <DialogContent
            style={{
              color: "red",
              display: "grid",
              gridTemplateColumns: "repeat(3,auto)",
              gap: "20px",
            }}
          >
            {credit.known_for
              ? credit.known_for.map((item) => {
                  return (
                    <Link to={`/${props.type}/${item.title}/${item.id}`}>
                      <div className="credit" onClick={handleChoose}>
                        <h2 className="credit-nameMovie">
                          {item.title ? item.title : item.name}
                        </h2>
                        <img
                          src={img_500 + item.poster_path}
                          alt={item.title}
                        />
                        <span className="credit-overview">{item.overview}</span>
                      </div>
                    </Link>
                  );
                })
              : null}
          </DialogContent>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Cast;
