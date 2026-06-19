import { type SchemaTypeDefinition } from 'sanity'

import {collectionType} from './collectionType'
import {categoryType} from './categoryType'
import {productType} from './productType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [collectionType, categoryType, productType],
}
