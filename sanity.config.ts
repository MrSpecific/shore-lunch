import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';
import { deskStructure } from './sanity/plugins/deskStructure';
import { CustomNavbar } from './sanity/components';
import { syncButton } from './sanity/plugins/syncButton';

import { apiVersion, dataset, previewSecretId, projectId } from '@lib/sanity';

// TODO: get previews working
// import { previewDocumentNode } from 'plugins/previewPane'
// import { productionUrl } from 'plugins/productionUrl'

// config: https://www.sanity.io/docs/configuration
// v3: https://www.sanity.io/docs/migrating-from-v2
// v3: https://www.sanity.io/blog/sanity-studio-v3-simplified-yet-powerful-customization

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Shore Lunch';

export default defineConfig({
  name: 'default',
  title,
  basePath: '/studio',
  projectId,
  dataset,
  studio: {
    components: {
      navbar: CustomNavbar,
    },
  },

  plugins: [
    deskTool({
      structure: deskStructure(),
      // TODO: get previews working
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      // defaultDocumentNode: previewDocumentNode({ apiVersion, previewSecretId }),
    }),
    // TODO: Add the "Open preview" action
    // productionUrl({
    //   apiVersion,
    //   previewSecretId,
    //   types: [postType.name, settingsType.name],
    // }),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    syncButton(),
  ],

  schema: {
    types: schemaTypes,
  },
});
