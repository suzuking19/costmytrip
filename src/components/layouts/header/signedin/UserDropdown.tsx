"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { User as UserType } from "@supabase/supabase-js";
import { signOut } from "./actions";

interface UserDropdownProps {
  user: UserType | null;
}

export default function UserDropdown({ user }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-2 p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {user?.user_metadata?.avatar_url ? (
          <Image
            src={user.user_metadata.avatar_url}
            alt="User Avatar"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-indigo-600" />
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-stone-300 rounded-lg shadow-lg z-50">
          <div className="py-1">
            <Link
              href="/mypage"
              className="flex items-center justify-between px-4 py-2 text-gray-900 hover:bg-gray-200 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <User className="h-4 w-4 mr-3" />
                My Page
              </div>
            </Link>
            <form action={signOut} className="w-full">
              <button
                type="submit"
                className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
