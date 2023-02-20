import { getApolloClient } from 'lib/apollo-client';

import {
    ABOUT_TEMPLATE,
    HOME_TEMPLATE,
    GLOBAL
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




export async function getHomeTemplate({ ID }) {

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: HOME_TEMPLATE,
    variables: {
      ID,
    },
  });

  return {
    data,
  };

}


export async function getGlobal() {

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: GLOBAL,
  });

  const global = data.data;

  return {
    global,
  };

}
