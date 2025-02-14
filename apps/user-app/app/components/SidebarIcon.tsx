"use client";
import { usePathname, useRouter } from "next/navigation";
import path from "path";
import React, { ReactNode } from "react";

const SidebarIcon = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;
  return (
    <div
      className={`cursor-pointer ${selected ? "text-[#6a51a6]" : "text-slate-500"} flex mb-3`}
      onClick={() => router.push(href)}
    >
      <div className="mr-3">{icon}</div>
      <div className="flex flex-col justify-center font-bold">{label}</div>
    </div>
  );
};

export default SidebarIcon;
