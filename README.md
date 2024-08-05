# Masterclass Optimizely

This example is an example of how to integrate an Optimizely GraphQL generated website with a powerful search engine like Coveo. Coveo has CoveoAtomic components available to integrate into the react front-end. The Coveo components will communicate with the Coveo Platform/Index.

## Based upon:

- [CMS Visual Builder](https://github.com/episerver/cms-visual-builder-vercel-beta)
- [Guide for Optimizely](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/create-a-demo-site-using-cms-saas-and-netlify)
- [Coveo Platform](https://docs.coveo.com/en/3361/coveo-platform-overview)
- [Coveo Atomic](https://docs.coveo.com/en/atomic/latest/usage/frameworks/atomic-react-wrapper/#reference)
- [Coveo Headless](https://docs.coveo.com/en/headless/latest/)

# Setup

- Step 1. Create, or use existing Optimizely Sandbox (`Optimizely Partner portal`)
- [Step 2. Create an Coveo Platform Organization](https://www.coveo.com/en/get-started?utm_marketing_tactic=docs)
- [Step 3. Index the Optimizely Contents using GraphQL connector](https://docs.coveo.com/en/o6ab0555/coveo-for-optimizely/index-optimizely-content)
- [Step 4. Download/configure your Front-end](https://github.com/episerver/cms-visual-builder-vercel-beta) or [Masterclass Optimizely](https://github.com/coveooss/masterclass_optimizely)
- [Step 5. Create Search API Key](https://docs.coveo.com/en/105/build-a-search-ui/use-api-key-authentication-with-the-search-api)
- Step 6. Build/deploy your front-end (`yarn build`)
- [Step 7. Configure the Coveo Platform](https://docs.coveo.com/en/3361/coveo-platform-overview)

## Setup local environment

Configure your local env by adding `.env.local` file in the root folder
Make sure to add the following values:

```bash
# Optimizely Global
OPTIMIZELY_DEBUG=0

# Optimizely Graph
OPTIMIZELY_GRAPH_GATEWAY=https://beta.cg.optimizely.com/
OPTIMIZELY_GRAPH_APP_KEY=YOUR_KEY_HERE
OPTIMIZELY_GRAPH_SECRET=YOUR_SECRET_HERE
OPTIMIZELY_GRAPH_SINGLE_KEY=YOUR_SINGLE_KEY_HERE
OPTIMIZELY_GRAPH_UPDATE_DELAY=2000
OPTIMIZELY_GRAPH_QUERY_LOG=0

# Optimizely CMS
OPTIMIZELY_CMS_URL=YOUR_INSTANCE_URL_HERE
OPTIMIZELY_CMS_CLIENT_ID=YOUR_CLIENT_HERE
OPTIMIZELY_CMS_CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
OPTIMIZELY_CMS_USER_ID=YOUR_USER_ID_HERE

# Frontend specfic
SITE_DOMAIN=localhost:3002
OPTIMIZELY_PUBLISH_TOKEN=optly-5d5216fe-047f-49e3-b8c6-579712b3606e

NODE_TLS_REJECT_UNAUTHORIZED=0

# Coveo
NEXT_PUBLIC_PLATFORM_URL=https://platform.cloud.coveo.com
NEXT_PUBLIC_ORGANIZATION_ID=YOUR_COVEO_ORG_ID_HERE
NEXT_PUBLIC_API_KEY=YOUR_COVEO_SEARCH_API_KEY_HERE

```

The `YOUR_COVEO_SEARCH_API_KEY_HERE` should be configured as follows:

- [API KEY]() should have `Search` and `Analytics - Push` permissions. **Important: make sure the SEARCH_KEY targets the proper `SearchHub=YOUR_HUB`**
- [YOUR_HUB](/src/engine.ts) set the proper search hub:

```ts
export const searchEngine = searchEngineGenerator({
  name: "searchEngine",
  search: { searchHub: "YOUR_HUB", pipeline: "Search" },
});
```

Then make sure you've got your local environment:

```bash
yarn install
```

Finally, start the local development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
