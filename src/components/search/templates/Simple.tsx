"use client";
import {
  AtomicResultImage,
  AtomicResultLink,
  AtomicResultSectionChildren,
  AtomicResultText,
  FoldedResult,
} from "@coveo/atomic-react";
import { useCallback, useEffect, useRef } from "react";
import Badges from "./Badges";

export const defaultStyleForTemplates = `
  :host {
    --badge-label-font-color: var(--primitive-color-gray-5, #5e636f);
    --badge-label-background: var(--primitive-color-gray-1, #f1f2f4);

    atomic-result-link a:hover {
      text-decoration: none;
    }

    cursor: pointer;
  }
  atomic-result-section-badges {
    --row-height: 100% !important;
  }
  
  atomic-result-link {
    display: block;
    margin-bottom: 1.25rem;
    font-size: var(--atomic-text-xl);
    color: var(--primitive-color-gray-6, #3B3E46);
    font-family: Gibson;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: 0.198px;
  }

  atomic-quickview::part(button) {
    border-color: var(--primitive-color-white-pureWhite);

    &:hover {
      color: var(--primitive-color-governorBay-5, #3a54dc);
    }
  }
  
  atomic-result-text b {  font-weight: bold; }

  ::part(result-badge-element) {
    padding-left: 0;
  }

  ::part(result-badge-label) {
    padding: 4px 16px;

    border-radius: 16px;
    border: 1.5px solid var(--primitive-color-gray-2, #dddfe3);
    background: var(--badge-label-background);
    box-shadow: 0px 1px 0px 0px rgba(4, 8, 31, 0.08);

    color: var(--badge-label-font-color);
    /* Badge Title */
    font-family: var(--font-barlow);
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px; /* 128.571% */
    letter-spacing: 0.042px;
    text-transform: uppercase;

    cursor: pointer;
    white-space: nowrap;
  }

  ::part(result-badge-label):hover {
    border-color: var(--primitive-color-gray-1, #F1F2F4);
    background: var(--primitive-color-white-pureWhite, #FFF);

    color: var(--primitive-color-grape-6, #592676);
  }

  .field-list {
    display: flex;
    gap: 8px;
    color: #5E636F;
    font-size: 14px;
    margin-top: 1.25rem;
    align-items: center;
    text-transform: capitalize;

    a { 
      color: var(--primitive-color-governorBay-5, #3a54dc);
       cursor: pointer;
    }
    a:not(:last-child)::after {
      content: ', ';
    }
    a:hover {
      text-decoration: none;
    }
  }
  .field-list + .field-list {
    margin-top: 0;
  }

  .field-label {
    color: #3B3E46;
    // font-size: 12px;
    font-weight: 500;
  }

  .result-body {
    display: flex;
  }

  .result-details {
    flex: 1;
  }

  atomic-result-image.result-image {
    width: 160px;
    height: 160px;
    margin-right: 1rem;
  }

  .featured-badge::part(result-badge-label) {
    border-color: var(--primitive-color-governorBay-5, #3a54dc);
    color: var(--primitive-color-governorBay-5, #3a54dc);
  }

  .recommended-badge::part(result-badge-label) {
    border-color: var(--primitive-color-NeoPurple-6, #5500aa);
    color: var(--primitive-color-NeoPurple-6, #5500aa);
  }
`;

export interface FoldedResultProps {
  foldedResult: FoldedResult;
}

export const handleResultCardClick = (evt: any) => {
  const target = evt.target as HTMLElement;
  const container = target?.shadowRoot?.querySelector(".result-root");
  const link = container?.querySelector(
    "atomic-result-link a[href]"
  ) as HTMLElement;
  link?.click();
};

export const preventClickPropagation = (evt: React.MouseEvent<HTMLElement>) => {
  evt.stopPropagation();
};

export function useRootClickHandler(clickHandler: (_evt: any) => void) {
  const nodeRef = useRef<HTMLAtomicResultSectionChildrenElement | null>(null);
  const getHost = useCallback(() => {
    const shadowRoot = nodeRef.current
      ?.closest(".result-root")
      ?.getRootNode() as ShadowRoot;
    return shadowRoot?.host;
  }, [nodeRef]);

  useEffect(() => {
    if (nodeRef.current) {
      getHost()?.addEventListener("click", clickHandler);
    }

    return () => getHost()?.removeEventListener("click", clickHandler);
  }, [clickHandler, getHost]);

  return nodeRef;
}

export function stripUrlDomain(
  url: string,
  domainMatch = /https:\/\/help\.barca\.group/
) {
  return url.replace(domainMatch, "");
}

export default function SimpleTemplate({ foldedResult }: FoldedResultProps) {
  const { result } = foldedResult;
  const { clickUri } = result;
  const rawKeysList = Object.keys(result.raw);
  const articleType = result.raw.source;
  const imageField = rawKeysList.find((key) => /image|thumbnail/i.test(key));

  const templateStyle = defaultStyleForTemplates + ``;

  const nodeRef = useRootClickHandler(handleResultCardClick);

  return (
    <>
      <style>{templateStyle}</style>
      <Badges {...foldedResult} />
      <AtomicResultSectionChildren className="result-body" ref={nodeRef}>
        {imageField && (
          <AtomicResultImage field={imageField} className="result-image" />
        )}
        <div className="result-details">
          <div className="result-link">
            <AtomicResultLink hrefTemplate={stripUrlDomain(clickUri)}>
              <a
                slot="attributes"
                target={
                  articleType === "Barca Help Articles" ||
                  articleType === "Barca Skipper Articles"
                    ? "_self"
                    : "_blank"
                }
                onClick={preventClickPropagation}
              ></a>
            </AtomicResultLink>
          </div>
          <AtomicResultText field="excerpt" />
        </div>
      </AtomicResultSectionChildren>
    </>
  );
}
