import { STATE } from '@/_constant/Transition';

export class TransitionDTO {
  step: STATE[];
  visited: {
    [STATE.YELLOW]: boolean;
  };
}
