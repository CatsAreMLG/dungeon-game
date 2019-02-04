import React from "react";
import { connect } from "react-redux";
import { SPRITE_SIZE } from "../../config/constants";
import "./styles.css";

const getTileSprite = type => {
  switch (type) {
    case 0:
      return "grass";
    case 3:
      return "tree";
    case 4:
      return "chest";
    case 5:
      return "rock";
    case 6:
      return "tree";
    default:
      return "grass";
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
      {props.tiles.map((tile, i) => (
        <MapTile key={`tile-${i}`} tile={tile} />
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
      height: "480px",
      outline: "3px solid white"
    }}
  >
    {props.tiles.map((row, i) => (
      <MapRow key={`row-${i}`} tiles={row} />
    ))}
  </div>
);
const mstp = state => {
  return {
    tiles: state.map.tiles
  };
};
export default connect(mstp)(Map);
