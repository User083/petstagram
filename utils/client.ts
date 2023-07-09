import {createClient} from '@sanity/client';

export const client = createClient({
  projectId: 'aj5ns7s0',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
