import { IsEnum } from 'class-validator';
import { TRANSITION } from '@constant';
export class State {
  @IsEnum(TRANSITION.STATE)
  state: TRANSITION.STATE;
}
