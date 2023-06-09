import { HomeIcon, RobotIcon, CogIcon, TagIcon } from '@sanity/icons';
import { type DocumentDefinition, definePlugin } from 'sanity';
import { type StructureResolver } from 'sanity/desk';

// https://www.sanity.io/docs/set-up-structure-builder-to-override-the-default-list-view

const pages = ['frontPage', 'productCollection'];
const documents = ['faq', 'product'];
const settings = ['siteSettings'];
const defined = [].concat(pages, documents, settings);

// export const deskStructure = (typeDef: DocumentDefinition): StructureResolver => {
export const deskStructure = (): StructureResolver => {
  return (S) =>
    S.list()
      .title('Content')
      .items([
        S.listItem()
          .title('Home Page')
          .icon(HomeIcon)
          .child(S.document().schemaType('frontPage').documentId('frontPage')),
        ...S.documentTypeListItems().filter((item) => !defined.includes(item.getId())),
        S.listItem()
          .title('Collection')
          .icon(TagIcon)
          .child(S.document().schemaType('productCollection').documentId('productCollection')),
        // Documents (global)
        S.divider(),
        ...S.documentTypeListItems().filter((item) => documents.includes(item.getId())),
        // Settings (global)
        S.divider(),
        S.listItem()
          .title('Settings')
          .icon(CogIcon)
          .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      ]);
};
