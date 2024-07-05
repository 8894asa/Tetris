import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

import { url } from "@/const/url";

type Props = {
  children: ReactNode;
};

export function DefaultLayout({ children }: Props) {
  const location = useLocation();
  const isMenu = location.pathname === url.menu;
  return (
    <div className="max-w-4xl mx-auto py-4">
      {!isMenu && (
        <Link className="rounded-md hover:bg-gray-200 py-2 px-1" to={url.menu}>
          メニューに戻る
        </Link>
      )}
      <div className={`${!isMenu && "mt-8"}`}>{children}</div>
    </div>
  );
}
