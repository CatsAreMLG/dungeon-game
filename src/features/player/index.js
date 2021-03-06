import React from "react";
import { connect } from "react-redux";
import walkSprite from "./player_walk.png";
import handleMovement from "./movement";

const Player = props => {
  return (
    <div
      style={{
        position: "absolute",
        top: props.position[1],
        left: props.position[0],
        backgroundImage: `url('${walkSprite}')`,
        backgroundPosition: props.spriteLocation,
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
