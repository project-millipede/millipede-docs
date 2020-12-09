import { BaseEntity } from './normalize/types';
import { createEntity } from './sub';
import { Timeline, timelineEntity } from './timeline';

export type UseCase = {
  timelines: Array<Timeline>;
} & BaseEntity;

export const useCaseEntity = createEntity<UseCase>('usecases', {
  timelines: [timelineEntity]
});
