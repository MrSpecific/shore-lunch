// Rich text annotations used in the block content editor
// import * as annotations from './annotations';
// Document types
import * as documents from './documents'
// Singleton document types
import * as singletons from './singletons'
// Block content
import * as blocks from './blocks'
// Object types
import * as objects from './objects'

export const schemaTypes = [
  ...Object.values(singletons),
  ...Object.values(documents),
  ...Object.values(blocks),
  ...Object.values(objects),
]
