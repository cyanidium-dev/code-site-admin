import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'code-site-admin',

  projectId: '9yuix50x',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Контент')
          .items([
            S.listItem()
              .title('Блог')
              .child(S.documentList().title('Статті блогу').filter('_type == "post"')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
