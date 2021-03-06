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
      default:
        return [oldPos[0], oldPos[1] + SPRITE_SIZE];
    }
  };
  const getSpriteLocation = (direction, walkIndex) => {
    switch (direction) {
      case "SOUTH":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`;
      case "EAST":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`;
      case "WEST":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 2}px`;
      case "NORTH":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 3}px`;
      default:
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`;
    }
  };
  const getWalkIndex = _ => {
    const walkIndex = store.getState().player.walkIndex;
    return walkIndex >= 7 ? 0 : walkIndex + 1;
  };
  const observeBoundaries = newPos => {
    return (
      newPos[0] >= 0 &&
      newPos[0] <= MAP_WIDTH - SPRITE_SIZE &&
      (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
    );
  };
  const observeSolids = newPos => {
    const tiles = store.getState().map.tiles;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;
    const nextTile = tiles[y][x];
    return nextTile;
  };
  const dispatchMove = (direction, newPos) => {
    const walkIndex = getWalkIndex();
    store.dispatch({
      type: "MOVE_PLAYER",
      payload: {
        position: newPos,
        direction: direction,
        spriteLocation: getSpriteLocation(direction, walkIndex),
        walkIndex: walkIndex
      }
    });
  };
  const attemptMove = direction => {
    const oldPos = store.getState().player.position;
    const oldLocation = store.getState().player.spriteLocation;
    const walkIndex = store.getState().player.walkIndex;
    const newPos = getNewPosition(oldPos, direction);
    if (observeBoundaries(newPos)) {
      switch (observeSolids(newPos)) {
        // chest
        case 4:
          const tiles = store.getState().map.tiles;
          const y = newPos[1] / SPRITE_SIZE;
          const x = newPos[0] / SPRITE_SIZE;
          let newTiles = [...tiles];
          newTiles[y][x] = 0;
          dispatchMove(direction, oldPos);
          alert("Here take this!");
          store.dispatch({
            type: "CHANGE_TILES",
            payload: {
              tiles: newTiles
            }
          });
          break;
        // secret tree
        case 3:
          dispatchMove(direction, newPos);
          break;
        case 2:
          dispatchMove(direction, newPos);
          break;
        case 1:
          dispatchMove(direction, newPos);
          break;
        // grass
        case 0:
          dispatchMove(direction, newPos);
          break;
        default:
          dispatchMove(direction, oldPos);
          break;
      }
    } else {
      dispatchMove(direction, oldPos);
    }
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
