import { type SchemaTypeDefinition } from 'sanity'

import post from './post'
import postedBy from './postedBy'
import comment from './comment'
import user from './user'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, postedBy, comment, user],
}
