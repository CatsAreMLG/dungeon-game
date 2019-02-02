import React from "react";
import { SPRITE_SIZE } from "../../config/constants";
import styles from "./styles.css";

const getTileSprite = type => {
  switch (type) {
    case 0:
      return "grass";
    case 5:
      return "rock";
    case 6:
      return "tree";
  }
};

const MapTile = props => {
  return (
    <div
      className={`tile ${getTileSprite(props.tile)}`}
      style={{
        height: SPRITE_SIZE,
        width: SPRITE_SIZE
      }}
    />
  );
};

const MapRow = props => {
  return (
    <div
      className="row"
      style={{
        height: SPRITE_SIZE
      }}
    >
      {props.tiles.map(tile => (
        <MapTile tile={tile} />
      ))}
    </div>
  );
};

const Map = props => (
  <div
    style={{
      position: "relative",
      top: "0px",
      left: "0px",
      width: "800px",
      height: "400px"
      // backgroundColor: "#3D5229"
    }}
  >
    {props.tiles.map(row => (
      <MapRow tiles={row} />
    ))}
  </div>
);

export default Map;
