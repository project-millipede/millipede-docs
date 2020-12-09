import { schema } from '@rest-hooks/normalizr';

import { BaseSchema, Find, Schema } from './normalize/types';

type DictSchema<T extends { [key: string]: unknown }> = {
  [K in keyof T]: Schema<Exclude<T[K], undefined | null>>;
};

type RelatedEntities<T extends { [key: string]: unknown }> = DictSchema<
  Find<T>
>;

export const createEntity = <T extends BaseSchema>(
  entityName: string,
  relatedEntities: RelatedEntities<T>
): schema.Entity<T> => new schema.Entity<T>(entityName, relatedEntities);
