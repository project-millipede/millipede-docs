import { v4 as uuidv4 } from 'uuid';

import { UseCase } from '../../typings/social';
import { timelineFactory } from './factories';

export const generateData = async () => {
  const timelines = await timelineFactory.buildList(2);

  const usecaseData: UseCase = {
    id: uuidv4(),
    timelines: [...timelines]
  };
  return usecaseData;
};
