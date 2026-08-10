"use client";
import { Menu, Lightbulb, BarChart3, HelpCircle, Settings } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-14 border-b-[1px] border-[rgb(58,58,58)] flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Link href="/">
          <button className="p-2 rounded-lg hover:bg-[rgb(51,51,51)] cursor-pointer">
            <Menu className="w-7 h-7 text-white" />
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg hover:bg-[rgb(51,51,51)] cursor-pointer">
          <Lightbulb className="w-7 h-7 text-white" />
        </button>
        <button className="p-2 rounded-lg hover:bg-[rgb(51,51,51)] cursor-pointer">
          <BarChart3 className="w-7 h-7 text-white" />
        </button>
        <button className="p-2 rounded-lg hover:bg-[rgb(51,51,51)] cursor-pointer">
          <HelpCircle className="w-7 h-7 text-white" />
        </button>
        <button className="p-2 rounded-lg hover:bg-[rgb(51,51,51)] cursor-pointer">
          <Settings className="w-7 h-7 text-white" />
        </button>
        <button
          className="border border-white rounded-full px-4 py-1.5 text-white text-sm font-medium cursor-pointer"
          onClick={() =>
            window.open(
              "https://demirelenes.dev",
              "_blank",
              "noopener,noreferrer",
            )
          }
        >
          made by Enes Demirel
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
