import {
  AtomicExternal,
  AtomicSearchBox,
  AtomicSearchInterface,
  SearchEngine,
} from "@coveo/atomic-react";
import { usePathname } from "next/navigation";

export default function Searchbox({ engine }: { engine: SearchEngine }) {
  const pathname = usePathname();
  console.log("Current path is:", pathname);
  return pathname === "/search" ? (
    <AtomicExternal selector="atomic-search-interface">
      <AtomicSearchBox redirectionUrl={"/search"} />
    </AtomicExternal>
  ) : (
    <AtomicSearchInterface
      engine={engine}
      onReady={() => Promise.resolve()}
      localization={(i18n) => {
        i18n.addResourceBundle("en", "translation", {
          search: "Search Optimizely",
        });
      }}
    >
      <AtomicSearchBox redirectionUrl={"/search"} />
    </AtomicSearchInterface>
  );
}
