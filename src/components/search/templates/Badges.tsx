import { selectFacet } from "@/engine";
import {
  AtomicQuickview,
  AtomicResultBadge,
  AtomicResultSectionActions,
  AtomicResultSectionBadges,
  Result,
} from "@coveo/atomic-react";
import { preventClickPropagation } from "./Default";

export default function Badges({ result }: { result: Result }) {
  const rawResult = result.raw;
  const featuredBadge = result.isTopResult ? (
    <AtomicResultBadge className="featured-badge" label="Featured" />
  ) : null;
  const recommendationBadge = result.isRecommendation ? (
    <AtomicResultBadge className="recommended-badge" label="Recommended" />
  ) : null;

  return (
    <>
      <AtomicResultSectionBadges>
        <AtomicResultBadge
          field="source"
          onClick={(e) => {
            preventClickPropagation(e);
            selectFacet("source", rawResult.source || "");
          }}
        ></AtomicResultBadge>
        {featuredBadge} {recommendationBadge}
      </AtomicResultSectionBadges>
      <AtomicResultSectionActions>
        <AtomicQuickview />
      </AtomicResultSectionActions>
    </>
  );
}
