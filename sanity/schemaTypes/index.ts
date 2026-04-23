import { type SchemaTypeDefinition } from "sanity";
import devotional from "../schemas/devotional";
// import sermon from "../schemas/sermon";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [devotional],
};
