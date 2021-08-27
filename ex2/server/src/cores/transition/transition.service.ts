import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CACHE_KEY } from '@constant';
import { Cache } from 'cache-manager';
import { TransitionDTO } from '@/common/cache/dto/Transition.dto';
import {
  STATE,
  EDGES,
  INIT_VISITED,
  INIT_TRANSITION,
} from '@/_constant/Transition';

@Injectable()
export class TransitionService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async reset(id) {
    let transition: TransitionDTO = await this.cacheManager.get(id);

    if (transition) {
      transition = {
        visited: INIT_VISITED,
        step: INIT_TRANSITION,
      };

      this.cacheManager.set(id, transition);
      return INIT_TRANSITION[0];
    }
    throw new NotFoundException(`${id} not existed`);
  }

  async getNextState(state: STATE, id: string): Promise<STATE> {
    let transition: TransitionDTO = await this.cacheManager.get(id);

    if (!transition) {
      transition = {
        step: INIT_TRANSITION,
        visited: INIT_VISITED,
      };
      await this.cacheManager.set(id, transition);
      return STATE.BLU;
    }

    const { step, visited } = transition;

    const currentStep = step[step.length - 1];

    if (currentStep === state) {
      return state;
    }

    if (EDGES[currentStep].includes(state)) {
      if (visited[state]) {
        throw new BadRequestException(
          `invalid state, ${state} cannot be repeat`,
        );
      }

      if (visited[state] === false) {
        visited[state] = true;
      }

      step.push(state);
      await this.cacheManager.set(id, transition);

      return state;
    }

    throw new BadRequestException('invalid state');
  }

  async getByCacheKey(id: string): Promise<STATE> {
    return this.cacheManager.get(id);
  }
}
