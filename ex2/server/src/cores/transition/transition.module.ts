import { CacheModule, Module } from '@nestjs/common';
import { TransitionService } from './transition.service';
import { TransitionController } from './transition.controller';

@Module({
  imports: [
    CacheModule.register({
      ttl: 30 * 60, // 30p
    }),
  ],
  providers: [TransitionService],
  controllers: [TransitionController],
})
export class TransitionModule {}
