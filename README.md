# Masterclass Optimizely

This example is an example of how to integrate an Optimizely GraphQL generated website with a powerful search engine like Coveo. Coveo has CoveoAtomic components available to integrate into the react front-end. The Coveo components will communicate with the Coveo Platform/Index.

## Based upon:

- [CMS Visual Builder](https://github.com/episerver/cms-visual-builder-vercel-beta)
- [Guide for Optimizely](https://docs.developers.optimizely.com/content-management-system/v1.0.0-CMS-SaaS/docs/create-a-demo-site-using-cms-saas-and-netlify)
- [Coveo Platform](https://docs.coveo.com/en/3361/coveo-platform-overview)
- [Coveo Atomic](https://docs.coveo.com/en/atomic/latest/usage/frameworks/atomic-react-wrapper/#reference)
- [Coveo Headless](https://docs.coveo.com/en/headless/latest/)
- [Demo site eCommerce](https://sports.barca.group/)
- [Demo site help](https://help.barca.group/)

# Setup

- Step 1. Create, or use existing Optimizely Sandbox (`Optimizely Partner portal`)
- [Step 2. Create an Coveo Platform Organization](https://www.coveo.com/en/get-started?utm_marketing_tactic=docs)
- [Step 3. Index the Optimizely Contents using GraphQL connector](https://docs.coveo.com/en/o6ab0555/coveo-for-optimizely/index-optimizely-content)
- [Step 4. Index other content sources](https://docs.coveo.com/en/1702/)
- [Step 5. Download/configure your Front-end](https://github.com/episerver/cms-visual-builder-vercel-beta) or [Masterclass Optimizely](https://github.com/coveooss/masterclass_optimizely)
- [Step 6. Create Search API Key](https://docs.coveo.com/en/105/build-a-search-ui/use-api-key-authentication-with-the-search-api)
- Step 7. Build/deploy your front-end (`yarn build`)
- [Step 8. Configure the Coveo Platform](https://docs.coveo.com/en/3361/coveo-platform-overview)

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

# Background information on getting started

This section will describe how to use the Coveo Atomic components, how to setup the back-end and the ML models.

## Reference

Search box on main page: [\_header.tsx](/src/components/header/_header.tsx)

Search page: [Search.tsx](/src/app/search/Search.tsx)

Search Engine configuration: [Engine.ts](/src/engine.ts)

## The scope of your Search Experience

Which content do we need to show for your specific use case? Based on what you want to show, you must index the contents. When the content comes from Optimizely, what kind of Objects are they? In the [examples](https://docs.coveo.com/en/o6ab0555/coveo-for-optimizely/index-optimizely-content) we index `ArticlePages`, but you might need more.

Besides Optimizely content, do you need any other contents? You might have:

- [Youtube Channels](https://docs.coveo.com/en/1637/)
- [Websites with a sitemap](https://docs.coveo.com/en/1967)
- [Product Catalog contents](https://docs.coveo.com/en/3295)

### Secured contents

In many deployments security is an important aspect. The contents provided in the Search Interface are secured based upon a login. This must/should be reflected in your index. With Coveo you can use [security](https://docs.coveo.com/en/1779) settings for each source you index. Some of the connectors natively supports the security ACL from the target system (Salesforce, Sharepoint, etc). When [pushing content](https://docs.coveo.com/en/68) you can also create the proper [security groups](https://docs.coveo.com/en/132).

When you are using security in your index, you must also create a [search token](https://docs.coveo.com/en/56) for the Search Interface. Based on the token the index knows which items belong to your permissions.

## Think about a proper Search Architecture

[Read about the architecture](https://docs.coveo.com/en/2941/project-guide/design-an-architecture-for-multiple-search-experiences) and design your interfaces accordingly.

## Get a Search Key

In our example we are using a Search API key which can execute queries and sent analytics events. When you have more dedicated scenario's where you need to work with secured contents, [read further on authentication provided by Coveo.](https://docs.coveo.com/en/102/).

[Create Search API Key](https://docs.coveo.com/en/105/build-a-search-ui/use-api-key-authentication-with-the-search-api)
You must configure it with a specific `searchHub`. That is being used to secure the token for that specific searchHub. In the `src\engine.ts` you can specify the name for your specific searchHub.

## Atomic Wrapper Components

Since our current UI is build on React, we can use the React Wrapper components from Coveo.
They are available [here](https://docs.coveo.com/en/atomic/latest/usage/frameworks/atomic-react-wrapper/#reference).

## Initialize the Engine

Before we can use the components we need to setup the Search Engine. In the example (see)[(/src/engine.ts)].

```ts
export const searchEngine = searchEngineGenerator({
  name: "searchEngine",
  search: { searchHub: "wimssearch", pipeline: "Search" },
});
```

The `searchHub` is used to identify where the search comes from (and is usually also used to secure the API Key).
The `pipeline` can be configured to access which [Query pipeline](https://docs.coveo.com/en/1611) will be used to execute the search request.

Inside the Query pipeline you can specify:

- Which filters to use
- Thesaurus entries
- Boosting/Ranking rules
- ML models to use
- Lots more

## Adjust the Engine

For each use case on your search (for example [recommendated articles](https://docs.coveo.com/en/atomic/latest/usage/atomic-recommendations/) or [recommended products](https://docs.coveo.com/en/3382)) you can create other instances of Search Engines, with their own specific properties.

## Facets

In the search page several [facets](https://docs.coveo.com/en/1571) are defined:

```ts
<AtomicFacetManager>
  <AtomicFacet field="source" label="Source" />
  <AtomicFacet field="author" label="Author" />
  <AtomicFacet field="ec_category" label="Category" />
  <AtomicFacet field="articletags" label="Article Tag" />
</AtomicFacetManager>
```

Facets must first be defined on a field within the index. Once that has done, a field can be used to shown as a facet. Showing the counts, using them as filters is all included in the default Atomic Components.

Remark: Facets are always based upon the resultlist.

## Result Templates

When your result set has multiple different content types, you might want to consider to use differen [result templates](https://docs.coveo.com/en/atomic/latest/reference/components/atomic-result-template/).

You can set specific conditions (like if a field value exists or from a specific source) to activate a specific template.

The template then can use different [result template components](https://docs.coveo.com/en/atomic/latest/reference/result-template-components/) to render the result.

## Analytics

A lot of the ML Models are based upon [Search Analytics](https://docs.coveo.com/en/l3bf0598/analyze-usage-data/overview). Most of the Atomic Components will sent Analytic events automatically to the Coveo Platform.

## ML Models

Coveo offers several [ML models](https://docs.coveo.com/en/1727). From Query Suggestions, Automatic Relevance Tuning to Generative AI models.

Most models work with our out of the box Atomic components.

## Changing the Back-End configuration

The back-end Coveo Platform can be used to setup:

- [Content sources](https://docs.coveo.com/en/1702/)
- [Query Pipelines](https://docs.coveo.com/en/1611)
- [ML Models](https://docs.coveo.com/en/1727)
