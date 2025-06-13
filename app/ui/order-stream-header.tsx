"use client";

import { usePathname } from "next/navigation";

const OrderStreamHeader = () => {
  const pathName = usePathname();

  const getLinkStyle = (path: string) => {
    const isActive = pathName === path;
    return isActive
      ? "rounded-xl bg-primary-one px-4 py-2 font-medium text-white"
      : "rounded-xl bg-primary-three/5 px-4 py-2 text-neutral-dark02";
  };

  return (
    <header className="sticky top-0 mb-4 bg-neutral-light">
      <h1 className="mb-4 text-3xl font-bold">
        {pathName === "/"
          ? "Ongoing orders"
          : pathName === "/completed-orders"
            ? "Completed orders"
            : pathName === "/unsuccessful-orders" && "Unsuccessful orders"}
      </h1>
      <nav className="flex gap-2 border-b pb-2">
        <a href="/" className={getLinkStyle("/")}>
          Active
        </a>
        <a
          href="/completed-orders"
          className={getLinkStyle("/completed-orders")}
        >
          Completed
        </a>
        <a
          href="/unsuccessful-orders"
          className={getLinkStyle("/unsuccessful-orders")}
        >
          Unsuccessful
        </a>
      </nav>
    </header>
  );
};

export default OrderStreamHeader;
