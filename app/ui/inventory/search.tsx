"use client";

import { SearchOutlined } from "@mui/icons-material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Search = () => {
  //   const [searchQuery, setSearchQuery] = useState({
  //     term: "",
  //     type: "mains",
  //   });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSetTerm = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("term", term);
    } else {
      params.delete("term");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSetItemType = (type: string) => {
    const params = new URLSearchParams(searchParams);
    if (type) {
      params.set("type", type);
    } else {
      params.delete("type");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  //   function handleSearch(query: { term: string; type: string }) {
  //     const params = new URLSearchParams(searchParams);

  //     if (query) {
  //       params.set("term", query.term);
  //       params.set("type", query.type);
  //     } else {
  //       params.delete("term");
  //       params.set("type", "mains");
  //     }
  //     replace(`${pathname}?${params.toString()}`);
  //   }

  // useEffect(() => {
  //   const params = new URLSearchParams(searchParams);
  //   if (!searchParams.get("type")) {
  //     params.set("type", "mains");
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }, []);

  return (
    <form>
      <div className="relative mb-2 flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer w-full py-3 pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder="Search for an item"
          onChange={(e) => {
            handleSetTerm(e.target.value);
          }}
          defaultValue={searchParams.get("term")?.toString()}
        />
        <SearchOutlined className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleSetItemType("mains")}
          type="button"
          className={`${searchParams.get("type")?.toString() === "mains" ? "bg-primary-one font-medium text-white" : "bg-primary-one/10 text-primary-three"} rounded-lg px-4 py-1`}
        >
          Mains
        </button>
        <button
          onClick={() => handleSetItemType("sides")}
          type="button"
          className={`${searchParams.get("type")?.toString() === "sides" ? "bg-primary-one font-medium text-white" : "bg-primary-one/10 text-primary-three"} rounded-lg px-4 py-1`}
        >
          Sides
        </button>
      </div>
    </form>
  );
};

export default Search;
