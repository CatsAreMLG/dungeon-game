import store from "../../config/store";
import { SPRITE_SIZE } from "../../config/constants";

export default function handleMovement(player) {
  const getNewPosition = direction => {
    const oldPos = store.getState().player.position;
    switch (direction) {
      case "NORTH":
        return [oldPos[0], oldPos[1] - SPRITE_SIZE];
      case "WEST":
        return [oldPos[0] - SPRITE_SIZE, oldPos[1]];
      case "SOUTH":
        return [oldPos[0], oldPos[1] + SPRITE_SIZE];
      case "EAST":
        return [oldPos[0] + SPRITE_SIZE, oldPos[1]];
    }
  };
  const dispatchMove = direction => {
    store.dispatch({
      type: "MOVE_PLAYER",
      payload: {
        position: getNewPosition(direction)
      }
    });
  };
  const handleKeyDown = e => {
    e.preventDefault();
    switch (e.keyCode) {
      case 87:
        return dispatchMove("NORTH");
      case 65:
        return dispatchMove("WEST");
      case 83:
        return dispatchMove("SOUTH");
      case 68:
        return dispatchMove("EAST");
      default:
        console.log(e.keyCode);
    }
  };
  window.addEventListener("keydown", e => {
    handleKeyDown(e);
  });
  return player;
}
