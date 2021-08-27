enum STATE {
  YELLOW = 'Yellow',
  BLU = 'Blu',
  GREEN = 'Green',
}

const EDGES: {
  [STATE.YELLOW]: STATE[];
  [STATE.BLU]: STATE[];
  [STATE.GREEN]: STATE[];
} = {
  Yellow: [STATE.BLU],
  Blu: [STATE.GREEN, STATE.YELLOW],
  Green: [STATE.BLU],
};

const INIT_VISITED = {
  [STATE.YELLOW]: false,
};

const INIT_TRANSITION = [STATE.BLU];

export { STATE, EDGES, INIT_VISITED, INIT_TRANSITION };
