import { mongoose, Store } from "../deps.ts";

export const saveEntityToStore = <TSchema>(params: {
  // deno-lint-ignore ban-types
  entity: mongoose.Document<unknown, {}, TSchema> & TSchema & {
    _id: mongoose.Types.ObjectId;
  };
  store: Store;
  key: string;
}) => {
  const { entity, store, key } = params;

  store.set(
    key,
    entity.save(),
  );
};
