"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FactCheckOutlined,
  FormatListBulletedOutlined,
  Inventory2Outlined,
  PersonOutlined,
} from "@mui/icons-material";

const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-1/2 w-full -translate-x-1/2 rounded-t-xl border border-gray-300 bg-white p-2 sm:w-3/4 lg:w-2/4">
      <ul className="flex items-center justify-around">
        <li>
          <Link
            href="/"
            className={`${
              pathname === "/" && "text-primary-three"
            } flex w-20 flex-col items-center gap-1 text-center`}
          >
            <FormatListBulletedOutlined />
            <span className="text-xs">Orders</span>
          </Link>
        </li>

        <li>
          <Link
            href="/inventory"
            className={`${
              pathname === "/inventory" && "text-primary-three"
            } flex w-20 flex-col items-center gap-1 text-center`}
          >
            <Inventory2Outlined />
            <span className="text-xs">Inventory</span>
          </Link>
        </li>

        <li>
          <Link
            href="/confirm-order"
            className={`${
              pathname === "/confirm-order" && "text-primary-three"
            } flex w-20 flex-col items-center gap-1 text-center`}
          >
            <FactCheckOutlined />
            <span className="text-xs">Confirm</span>
          </Link>
        </li>

        <li>
          <Link
            href="/account"
            className={`${
              pathname === "/account" && "text-primary-three"
            } flex w-20 flex-col items-center gap-1 text-center`}
          >
            <PersonOutlined />
            <span className="text-xs">Account</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
