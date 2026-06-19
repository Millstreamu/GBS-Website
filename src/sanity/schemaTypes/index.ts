import { type SchemaTypeDefinition } from 'sanity'

import {collectionType} from './collectionType'
import {categoryType} from './categoryType'
import {productType} from './productType'
import {orderType} from './orderType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [collectionType, categoryType, productType, orderType],
}
