import React from "react";
import { connect } from "react-redux";
import walkSprite from "./player_walk.png";
import handleMovement from "./movement";

const Player = ({ position }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: position[1],
        left: position[0],
        backgroundImage: `url('${walkSprite}')`,
        backgroundPosition: "0 0",
        width: "40px",
        height: "40px"
      }}
    />
  );
};
const mstp = state => {
  return {
    ...state.player
  };
};
export default connect(mstp)(handleMovement(Player));
