import { Metadata } from "next";

import dynamic from "next/dynamic";

const Search = dynamic(() => import("./Search"), { ssr: false });

export const metadata: Metadata = {
  title: "Search",
};
export default function Page() {
  return <Search />;
}
