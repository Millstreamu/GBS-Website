import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Good Boy Supply')
    .items([
      S.documentTypeListItem('collection').title('Collections'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('product').title('Products'),
      S.documentTypeListItem('order').title('Orders'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['collection', 'category', 'product', 'order'].includes(item.getId()!),
      ),
    ])
