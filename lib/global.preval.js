import preval from 'next-plugin-preval';
import { gql, request, responsiveImageFragment } from './datocms';

// Get Global data
async function getData() {
  return {};
}

// Export default and wrap with `preval()`
export default preval(getData());
