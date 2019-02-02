import store from "../../config/store";
import { SPRITE_SIZE, MAP_HEIGHT, MAP_WIDTH } from "../../config/constants";

export default function handleMovement(player) {
  const getNewPosition = (oldPos, direction) => {
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
  const getSpriteLocation = direction => {
    switch (direction) {
      case "NORTH":
        return `0px 120px`;
      case "WEST":
        return `0px 80px`;
      case "SOUTH":
        return `0px 0px`;
      case "EAST":
        return `0px 40px`;
    }
  };
  const observeBoundaries = (oldPos, newPos) => {
    return (
      newPos[0] >= 0 &&
      newPos[0] <= MAP_WIDTH - SPRITE_SIZE &&
      (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
    );
  };
  const observeSolids = (oldPos, newPos) => {
    const tiles = store.getState().map.tiles;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;
    const nextTile = tiles[y][x];
    return nextTile < 5;
  };
  const dispatchMove = (direction, newPos) => {
    store.dispatch({
      type: "MOVE_PLAYER",
      payload: {
        position: newPos,
        direction,
        spriteLocation: getSpriteLocation(direction)
      }
    });
  };
  const attemptMove = direction => {
    const oldPos = store.getState().player.position;
    const newPos = getNewPosition(oldPos, direction);
    if (observeBoundaries(oldPos, newPos) && observeSolids(oldPos, newPos))
      dispatchMove(direction, newPos);
  };
  const handleKeyDown = e => {
    e.preventDefault();
    switch (e.keyCode) {
      case 87:
        return attemptMove("NORTH");
      case 65:
        return attemptMove("WEST");
      case 83:
        return attemptMove("SOUTH");
      case 68:
        return attemptMove("EAST");
      default:
        console.log(e.keyCode);
    }
  };
  window.addEventListener("keydown", e => {
    handleKeyDown(e);
  });
  return player;
}
