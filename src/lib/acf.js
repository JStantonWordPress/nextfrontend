import { getApolloClient } from 'lib/apollo-client';

import {
  ABOUT_TEMPLATE,
} from 'data/acf';


export async function getAboutTemplate({ ID }) {

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: ABOUT_TEMPLATE,
    variables: {
      ID,
    },
  });


  return {
    data,
  };

}
