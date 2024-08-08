"use client";
import SimpleTemplate from "@/components/search/templates/Simple";
import { searchEngine } from "@/engine";

import {
  AtomicBreadbox,
  AtomicDidYouMean,
  AtomicFacet,
  AtomicFacetManager,
  AtomicFoldedResultList,
  AtomicGeneratedAnswer,
  AtomicLayoutSection,
  AtomicNoResults,
  AtomicPager,
  AtomicQueryError,
  AtomicQuerySummary,
  AtomicRefineToggle,
  AtomicSearchInterface,
  AtomicSearchLayout,
  AtomicSortDropdown,
  AtomicSortExpression,
  FoldedResult,
} from "@coveo/atomic-react";

export default function Search() {
  const templates = (foldedResult: FoldedResult) => {
    const { result } = foldedResult;
    const sourceName = result.raw.source || "";
    const objectType = result.raw.objecttype || "";
    return <SimpleTemplate foldedResult={foldedResult} />;
  };

  return (
    <div className="search-results__container" suppressHydrationWarning={true}>
      <AtomicSearchInterface
        engine={searchEngine}
        fieldsToInclude={[
          "source",
          "objecttype",
          "ec_images",
          "author",
          "ytthumbnailurl",
        ]}
        localization={(i18n) => {
          i18n.addResourceBundle("en", "translation", {
            search: "Search Optimizely",
          });
        }}
      >
        <AtomicSearchLayout>
          <AtomicLayoutSection section="facets">
            <AtomicFacetManager>
              <AtomicFacet field="source" label="Source" />
              <AtomicFacet field="author" label="Author" />
              <AtomicFacet field="ec_category" label="Category" />
              <AtomicFacet field="articletags" label="Article Tag" />
            </AtomicFacetManager>
          </AtomicLayoutSection>
          <AtomicLayoutSection section="main">
            <AtomicLayoutSection section="results">
              <AtomicGeneratedAnswer collapsible={true} />
            </AtomicLayoutSection>
            <AtomicLayoutSection section="status">
              <AtomicBreadbox />
              <AtomicQuerySummary />
              <AtomicRefineToggle />
              <AtomicSortDropdown>
                <AtomicSortExpression
                  label="relevance"
                  expression="relevancy"
                />
                <AtomicSortExpression
                  label="Price (low to high)"
                  expression="ec_price ascending"
                />
                <AtomicSortExpression
                  label="Price (high to low)"
                  expression="ec_price descending"
                />
              </AtomicSortDropdown>
              <AtomicDidYouMean />
            </AtomicLayoutSection>
            <AtomicLayoutSection section="results">
              <AtomicFoldedResultList imageSize="none" template={templates} />
              <AtomicQueryError />
              <AtomicNoResults />
            </AtomicLayoutSection>
            <AtomicLayoutSection section="pagination">
              <AtomicPager />
            </AtomicLayoutSection>
          </AtomicLayoutSection>
        </AtomicSearchLayout>
      </AtomicSearchInterface>
    </div>
  );
}
