import {
  loadFacetSetActions,
  buildSearchEngine,
  SearchEngine,
  getOrganizationEndpoints,
  RegisterFacetActionCreatorPayload,
  ContextPayload,
  CoreEngine,
  buildContext,
  loadSearchAnalyticsActions,
  loadSearchActions,
} from "@coveo/headless";
import {
  RecommendationEngine,
  RecommendationEngineConfiguration,
  buildRecommendationEngine,
} from '@coveo/headless/recommendation';

const searchKey = process.env.NEXT_PUBLIC_API_KEY ?? '';
const orgId = process.env.NEXT_PUBLIC_ORGANIZATION_ID ?? '';
const DEFAULT_CONFIG = {
  accessToken: searchKey,
  organizationEndpoints: getOrganizationEndpoints(orgId),
  organizationId: orgId,
};

const buildConfig = <T>(customConfig: any = {}) => {
  const config = {
    configuration: {
      preprocessRequest: async (request: any) => {
        //Do we want to set custom contexts into the search request?
        // try {
        //   const loggedInUser = sessionStorage.getItem('barca-user');
        //   const requestBody = JSON.parse(request.body as string);
        //   if (!requestBody.context) {
        //     requestBody.context = {};
        //   }
        //   requestBody.context.log_in = false;
        //   if (loggedInUser) {
        //     requestBody.context.log_in = true;
        //     requestBody.context.purchased_products = 'Skipper';
        //   }
        //   request.body = JSON.stringify(requestBody);
        // } catch (e) {
        //   // no-op - window is not defined
        // }
        return request;
      },
      ...DEFAULT_CONFIG,
      ...customConfig,

      analytics: {
        analyticsMode: 'next',
        trackingId: 'support',
        ...(customConfig.analytics || {}),
      },
    },
  } as T;

  return config;
};

const setCustomContext = (customContext?: Partial<ContextPayload>) => (engine: CoreEngine) => {
  const ctx = buildContext(engine);
  ctx.set({ website: 'support', ...(customContext || {}) });
  return engine;
};

const searchEngineGenerator = compose<SearchEngine>(buildConfig, buildSearchEngine, setCustomContext());

export const searchEngine = searchEngineGenerator({
  name: 'searchEngine',
  search: { searchHub: 'wimssearch', pipeline: 'Search' },
});


export const articleEngine = searchEngineGenerator({
  analytics: { enabled: false },
  name: 'articleEngine',
  search: { searchHub: 'wimssearch' },
});

export const recsEngineGenerator = (
  engConfig: Partial<RecommendationEngineConfiguration>,
  customContext?: Partial<ContextPayload>,
) => {
  const { searchHub = 'Recs', name = 'recommendationsEngine', ...remainingProps } = engConfig || {};

  return compose<RecommendationEngine>(
    buildConfig,
    buildRecommendationEngine,
    setCustomContext(customContext),
  )({ searchHub, name, ...remainingProps });
};

export const selectFacet = (facetId: string, facetValue: string, engine: SearchEngine = searchEngine) => {
  const facetActions = loadFacetSetActions(engine);

  engine.dispatch(
    facetActions.toggleSelectFacetValue({
      facetId,
      selection: { value: facetValue, state: 'selected', numberOfResults: 1 },
    }),
  );
  const analyticsActions = loadSearchAnalyticsActions(engine);
  const searchActions = loadSearchActions(engine);

  engine.dispatch(searchActions.executeSearch(analyticsActions.logFacetSelect({ facetId, facetValue })));
};

type AnyFunction = (..._args: any[]) => any;

function compose<R>(...funcs: AnyFunction[]) {
  return function (this: any, ...args: any[]): R {
    const [currFunc, ...reaminingFuncs] = funcs;
    let result = currFunc.apply(this, args);
    for (let i = 0; i < reaminingFuncs.length; i++) {
      result = reaminingFuncs[i].call(this, result);
    }
    return result;
  };
}